import { Book, Prisma } from '@prisma/client';
import PrismaService from '@services/PrismaService';
import AbstractSingleton from '@utils/AbstractSingleton';

export default class BookRepository extends AbstractSingleton {
	private prismaService: PrismaService;

	constructor() {
		super();
		this.prismaService = PrismaService.getInstance();
	}

	public static getInstance(): BookRepository {
		return BookRepository._getInstance<BookRepository>();
	}

	async create(data: Omit<Book, 'id'>): Promise<Book> {
		return this.prismaService.book.create({
			data,
		});
	}

	async findById(
		id: number,
		args?: Omit<Prisma.BookFindFirstArgs, 'where'>,
	): Promise<Book | null> {
		return this.prismaService.book.findFirst({
			where: {
				id,
			},
			...args,
		});
	}

	async findByPath(
		path: string,
		args?: Omit<Prisma.BookFindFirstArgs, 'where'>,
	): Promise<Book | null> {
		return this.prismaService.book.findFirst({
			where: {
				path,
			},
			...args,
		});
	}

	async findAll(
		args?: Omit<Prisma.BookFindManyArgs, 'where'>,
	): Promise<Book[]> {
		return this.prismaService.book.findMany(args);
	}

	async findByLabel(
		label: string,
		args?: Omit<Prisma.BookFindManyArgs, 'where'>,
	): Promise<Book[]> {
		return this.prismaService.book.findMany({
			where: {
				labels: {
					some: {
						labelId: label,
					},
				},
			},
			include: {
				labels: true,
			},
			...args,
		});
	}

	async addLabel(bookId: number, labelId: string): Promise<Book> {
		await this.prismaService.bookLabel.create({
			data: {
				bookId,
				labelId,
			},
		});

		const book = await this.findById(bookId);

		if (!book) return Promise.reject('Book not found');

		return book;
	}

	async removeLabel(bookId: number, labelId: string): Promise<Book> {
		await this.prismaService.bookLabel.deleteMany({
			where: {
				bookId,
				labelId,
			},
		});

		const book = await this.findById(bookId);

		if (!book) return Promise.reject('Book not found');

		return book;
	}

	async addReadingSession(bookId: number, readingSessionId: number) {
		await this.prismaService.book.update({
			where: {
				id: bookId,
			},
			data: {
				readingSessionId,
			},
		});
	}
}
