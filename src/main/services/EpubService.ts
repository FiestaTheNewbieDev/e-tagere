import { Book } from '@prisma/client';
import EPub from 'epub';

type EpubMetadata = EPub.Metadata & { publisher?: string; cover?: string };

export default class EpubService {
	private epub: EPub;

	constructor(filePath: string) {
		this.epub = new EPub(filePath);
	}

	private async initialize(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.epub.on('end', resolve);
			this.epub.on('error', reject);
			this.epub.parse();
		});
	}

	async extractMetadata(): Promise<Omit<Book, 'id' | 'path' | 'format'>> {
		await this.initialize();

		const metadata: EpubMetadata = this.epub.metadata;

		let cover = null;
		if (metadata.cover)
			cover = await new Promise<string | null>((resolve) => {
				this.epub.getImage(metadata.cover!, (err, data, mimeType) => {
					if (err) {
						resolve(null);
					} else {
						const base64Image = `data:${mimeType};base64,${data.toString('base64')}`;
						resolve(base64Image);
					}
				});
			});

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
}
