import { ReadingSession } from '@prisma/client';
import BookRepository from '@repositories/BookRepository';
import PrismaService from '@services/PrismaService';
import AbstractSingleton from '@utils/AbstractSingleton';

export default class ReadingSessionRepository extends AbstractSingleton {
	private prismaService: PrismaService;
	private bookRepository: BookRepository;

	constructor() {
		super();
		this.prismaService = PrismaService.getInstance();
		this.bookRepository = BookRepository.getInstance();
	}

	public static getInstance(): ReadingSessionRepository {
		return ReadingSessionRepository._getInstance<ReadingSessionRepository>();
	}

	async create(
		bookId: number,
		data: Omit<ReadingSession, 'id'>,
	): Promise<ReadingSession> {
		const session = await this.prismaService.readingSession.create({
			data,
		});

		await this.bookRepository.addReadingSession(bookId, session.id);

		return session;
	}

	async findByBookId(bookId: number): Promise<ReadingSession | null> {
		const book = await this.bookRepository.findById(bookId, {
			select: {
				readingSessionId: true,
			},
		});

		if (!book || !book.readingSessionId) return null;

		return this.prismaService.readingSession.findUnique({
			where: {
				id: book.readingSessionId,
			},
		});
	}
}
