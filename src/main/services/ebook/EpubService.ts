import { TOC } from '@myTypes/ebook';
import { Book } from '@prisma/client';
import AbstractEbookService from '@services/ebook/AbstractEbookService';
import EPub from 'epub';

type EpubMetadata = EPub.Metadata & { publisher?: string; cover?: string };

const IMAGE_REGEX = /src="([^"]+)"/g;

export default class EpubService extends AbstractEbookService {
	protected static instance: EpubService;
	private epub: EPub | null = null;

	constructor(filePath: string) {
		super(filePath);
	}

	public static getInstance(filePath: string): EpubService {
		return super.getInstance.call(this, filePath) as EpubService;
	}

	private async initialize(): Promise<void> {
		if (this.epub) return;

		this.epub = new EPub(this.filePath);

		return new Promise((resolve, reject) => {
			this.epub!.on('end', resolve);
			this.epub!.on('error', (error) => {
				this.epub = null;
				reject(error);
			});
			this.epub!.parse();
		});
	}

	async close(): Promise<void> {
		if (this.epub) {
			this.epub.removeAllListeners();
			this.epub = null;
		}
	}

	async extractMetadata(): Promise<Omit<Book, 'id' | 'path' | 'format'>> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		const metadata: EpubMetadata = this.epub.metadata;

		let cover = null;
		if (metadata.cover) cover = await this.getImageBase64(metadata.cover);
		return {
			title: metadata.title,
			cover: cover,
			author: metadata.creator || null,
			language: metadata.language || null,
			identifier: null,
			publisher: metadata.publisher || null,
			subject: metadata.subject || null,
			description: metadata.description || null,
			date: new Date(metadata.date) || null,
			rights: null,
			coverage: null,
			source: null,
		};
	}

	async extractTOC(): Promise<TOC> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		return this.epub.toc.map((item) => ({
			title: item.title,
			href: item.href,
		}));
	}

	async getChapter(href: string): Promise<string> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		return new Promise((resolve, reject) => {
			this.epub!.getChapter(href, (err, text) => {
				if (err) {
					reject(err);
				} else {
					resolve(text);
				}
			});
		});
	}

	async getImageBase64(href: string): Promise<string> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		return new Promise((resolve, reject) => {
			this.epub!.getImage(href, (err, data, mimeType) => {
				if (err) {
					reject(err);
				} else {
					const base64Image = `data:${mimeType};base64,${data.toString('base64')}`;
					resolve(base64Image);
				}
			});
		});
	}

	async getFormattedChapter(href: string): Promise<string> {
		const rawContent = await this.getChapter(href);

		let match;
		let formattedContent = rawContent;

		while ((match = IMAGE_REGEX.exec(rawContent)) !== null) {
			const imagePath = match[1];
			const imageBase64 = await this.getImageBase64(imagePath);
			if (imageBase64) {
				formattedContent = formattedContent.replace(
					match[0],
					`src="${imageBase64}"`,
				);
			}
		}

		return formattedContent;
	}
}
