import { TOC } from '@myTypes/ebook';
import { Book } from '@prisma/client';

export default abstract class AbstractEbookService {
	protected static instance: AbstractEbookService;
	protected filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	public static getInstance<T extends AbstractEbookService>(
		this: new (filePath: string) => T,
		filePath: string,
	): T {
		if (!this.instance || this.instance.filePath !== filePath) {
			this.instance = new this(filePath);
		}
		return this.instance as T;
	}

	abstract extractMetadata(): Promise<Omit<Book, 'id' | 'path' | 'format'>>;
	abstract extractTOC(): Promise<TOC>;
	abstract getChapter(href: string): Promise<string>;
	abstract getFormattedChapter(href: string): Promise<string>;

	getFilePath(): string {
		return this.filePath;
	}
}
