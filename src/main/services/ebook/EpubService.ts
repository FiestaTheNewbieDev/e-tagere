import { Book, TOC } from '@myTypes/ebook';
import AbstractEbookService from '@services/ebook/AbstractEbookService';
import EPub from 'epub';

type EpubMetadata = EPub.Metadata & { publisher?: string; cover?: string };
type ManifestEntry = { id: string; href: string };

const IMAGE_REGEX = /src="([^"]+\.(?:jpg|jpeg|png|gif|bmp))"/g;

export default class EpubService extends AbstractEbookService {
	private initializing: Promise<void> | null = null;
	private epub: EPub | null = null;

	constructor(filePath: string) {
		super(filePath);
	}

	public static getInstance(filePath: string): EpubService {
		return super._getInstance<EpubService>(filePath);
	}

	private async initialize(): Promise<void> {
		if (this.epub) return;
		if (this.initializing) return this.initializing;

		this.epub = new EPub(this.filePath);

		this.initializing = new Promise((resolve, reject) => {
			this.epub!.on('end', resolve);
			this.epub!.on('error', (error) => {
				this.epub = null;
				reject(error);
			});
			this.epub!.parse();
		});

		await this.initializing;
	}

	async close(): Promise<void> {
		if (this.epub) {
			this.epub.removeAllListeners();
			this.epub = null;
		}
	}

	async extractMetadata(): Promise<
		Omit<Book, 'id' | 'path' | 'format' | 'readingSessionId'>
	> {
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
			date: metadata.date ? new Date(metadata.date).toISOString() : null,
			rights: null,
			coverage: null,
			source: null,
		};
	}

	async extractTOC(): Promise<TOC> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		return this.epub.toc.map((item) => ({
			id: item.id,
			title: item.title,
			href: item.href,
		}));
	}

	async getImageBase64(href: string): Promise<string> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		return new Promise((resolve, reject) => {
			this.epub!.getImage(href, (err, data, mimeType) => {
				if (err) {
					reject(
						new Error(`Error getting base64 image by href: ${err}`),
					);
				} else {
					const base64Image = `data:${mimeType};base64,${data.toString('base64')}`;
					resolve(base64Image);
				}
			});
		});
	}

	async getChapter(id: string, href: string): Promise<string> {
		await this.initialize();

		if (!this.epub) return Promise.reject('Epub not initialized');

		return Promise.any([
			new Promise<string>((resolve, reject) => {
				this.epub!.getChapter(id, (err, text) => {
					if (err) {
						reject(
							new Error(
								`Error getting chapter by id: ${err.message}`,
							),
						);
					} else if (!text) {
						reject(new Error('Chapter by id is empty'));
					} else {
						resolve(text);
					}
				});
			}),
			new Promise<string>((resolve, reject) => {
				this.epub!.getChapter(href, (err, text) => {
					if (err) {
						reject(
							new Error(
								`Error getting chapter by href: ${err.message}`,
							),
						);
					} else if (!text) {
						reject(new Error('Chapter by href is empty'));
					} else {
						resolve(text);
					}
				});
			}),
		]);
	}

	private getManifestEntry(href: string): ManifestEntry | null {
		if (!this.epub) return null;

		const manifestEntries = Object.values(this.epub.manifest);

		for (const entry of manifestEntries) {
			if (entry.href.endsWith(href) || entry.href.includes(href)) {
				return { id: entry.id, href: entry.href };
			}
		}

		return null;
	}

	async getFormattedChapter(id: string, href: string): Promise<string> {
		const rawContent = await this.getChapter(id, href);

		const matches = rawContent.matchAll(IMAGE_REGEX);
		let formattedContent = rawContent;

		for (const match of matches) {
			const imagePath = match[1];
			try {
				const href = this.getManifestEntry(imagePath)?.href;

				if (!href) continue;

				const imageBase64 = await this.getImageBase64(href);

				formattedContent = formattedContent.replace(
					match[0],
					`src="${imageBase64}"`,
				);
			} catch (error) {
				console.error(`Failed to load image: ${imagePath}`, error);
			}
		}

		return formattedContent;
	}
}
