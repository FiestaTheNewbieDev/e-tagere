import { Book, ManifestEntry, TOC } from '@myTypes/ebook';

export default abstract class AbstractEbookService {
	protected static instance: AbstractEbookService;
	protected filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	protected static _getInstance<T extends AbstractEbookService>(
		this: new (filePath: string) => T,
		filePath: string,
	): T {
		if (
			!AbstractEbookService.instance ||
			AbstractEbookService.instance.filePath !== filePath
		) {
			if (AbstractEbookService.instance) {
				AbstractEbookService.instance.close();
			}
			AbstractEbookService.instance = new this(filePath);
		}
		return AbstractEbookService.instance as T;
	}

	abstract close(): Promise<void>;
	abstract extractMetadata(): Promise<
		Omit<Book, 'id' | 'path' | 'format' | 'readingSessionId'>
	>;
	abstract extractTOC(): Promise<TOC>;
	abstract getManifestEntry(href: string): ManifestEntry | null;
	abstract getChapter(href: string): Promise<string>;
	abstract getFormattedChapter(href: string): Promise<string>;

	getFilePath(): string {
		return this.filePath;
	}
}
