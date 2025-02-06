import { Book, ManifestEntry, TOC } from '@myTypes/ebook';

export default abstract class AbstractEbookService {
	protected filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	abstract extractMetadata(): Promise<
		Omit<Book, 'id' | 'path' | 'format' | 'readingSessionId'>
	>;
	abstract extractTOC(): Promise<TOC>;
	abstract getManifestEntry(href: string): Promise<ManifestEntry | null>;
	abstract getChapter(href: string): Promise<string>;
	abstract getFormattedChapter(href: string): Promise<string>;

	getFilePath(): string {
		return this.filePath;
	}
}
