import { Book } from '@prisma/client';
import PrismaService from '@services/PrismaService';
import AbstractSingleton from '@utils/AbstractSingleton';

export default class BookRepository extends AbstractSingleton {
	private prismaService: PrismaService;

	private constructor() {
		super();
		this.prismaService = PrismaService.getInstance();
	}

	public static getInstance(): BookRepository {
		return super._getInstance<BookRepository>();
	}

	async create(data: Omit<Book, 'id'>): Promise<Book> {
		return this.prismaService.book.create({
			data,
		});
	}

	async findById(id: number): Promise<Book | null> {
		return this.prismaService.book.findFirst({
			where: {
				id,
			},
		});
	}

	async findByPath(path: string): Promise<Book | null> {
		return this.prismaService.book.findFirst({
			where: {
				path,
			},
		});
	}

	async findAll(): Promise<Book[]> {
		return this.prismaService.book.findMany();
	}

	async findByLabel(label: string): Promise<Book[]> {
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
}
