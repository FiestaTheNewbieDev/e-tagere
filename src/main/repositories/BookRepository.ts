import PrismaService from '@main/services/PrismaService';
import { Book } from '@prisma/client';

export default class BookRepository {
	private static instance: BookRepository;
	private prismaService: PrismaService;

	private constructor() {
		this.prismaService = PrismaService.getInstance();
	}

	public static getInstance(): BookRepository {
		if (!BookRepository.instance) {
			BookRepository.instance = new BookRepository();
		}
		return BookRepository.instance;
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
