import { Book } from '@myTypes/ebook';
import { ReadingSession } from '@prisma/client';
import BookRepository from '@repositories/BookRepository';
import ReadingSessionRepository from '@repositories/ReadingSessionRepository';
import AbstractEbookService from '@services/ebook/AbstractEbookService';
import EpubService from '@services/ebook/EpubService';

export type GetReadingSessionResponse = {
	session: ReadingSession;
	content: string;
};

export default class ReaderService {
	protected static instance: ReaderService;
	private bookId: number;
	private book: Book | null = null;
	private bookRepository: BookRepository;
	private readingSessionRepository: ReadingSessionRepository;
	private ebookService: AbstractEbookService | null = null;

	constructor(bookId: number) {
		this.bookId = bookId;
		this.bookRepository = BookRepository.getInstance();
		this.readingSessionRepository = ReadingSessionRepository.getInstance();
	}

	private async initialize(): Promise<void> {
		if (this.book) return;

		this.book = await this.bookRepository.findById(this.bookId);

		if (!this.book) {
			throw new Error(`Book not found: ${this.bookId}`);
		}

		switch (this.book.format) {
			case 'epub':
				this.ebookService = EpubService.getInstance(this.book.path);
				break;
			default:
				throw new Error(`Unsupported format: ${this.book.format}`);
		}
	}

	public static getInstance(bookId: number): ReaderService {
		if (
			!ReaderService.instance ||
			ReaderService.instance.bookId !== bookId
		) {
			ReaderService.instance = new ReaderService(bookId);
		}
		return ReaderService.instance;
	}

	public async getReadingSession(): Promise<GetReadingSessionResponse> {
		await this.initialize();

		if (!this.ebookService)
			throw new Error('Ebook service not initialized');

		const promises = await Promise.all([
			this.readingSessionRepository.findByBookId(this.bookId),
			this.ebookService.extractTOC(),
		]);

		let session = promises[0];
		const toc = promises[1];

		if (!session) {
			session = await this.readingSessionRepository.create(this.bookId, {
				chapterId: toc[0].id,
				chapterHref: toc[0].href,
				textOffset: 0,
			});
		}

		const content = await Promise.any([
			this.ebookService.getFormattedChapter(session.chapterHref),
			this.ebookService.getFormattedChapter(session.chapterId),
		]);

		return { session, content };
	}
}
