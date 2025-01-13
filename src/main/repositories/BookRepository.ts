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
}
