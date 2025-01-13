import BookRepository from '@main/repositories/BookRepository';
import FolderRepository from '@main/repositories/FolderRepository';
import EpubService from '@main/services/EpubService';
import { Book, Folder } from '@prisma/client';
import ALLOWED_EBOOK_EXTENSIONS from '@utils/allowedEbookExtensions';
import fs from 'fs';
import path from 'path';

export default class LibraryService {
	private static instance: LibraryService;
	private folderRepository: FolderRepository;
	private bookRepository: BookRepository;

	constructor() {
		this.folderRepository = FolderRepository.getInstance();
		this.bookRepository = BookRepository.getInstance();
	}

	public static getInstance(): LibraryService {
		if (!LibraryService.instance) {
			LibraryService.instance = new LibraryService();
		}
		return LibraryService.instance;
	}

	async getBooks(): Promise<Book[]> {
		const books = await this.bookRepository.findAll();
		return books;
	}

	async indexDirectory(
		directoryPath: string,
	): Promise<{ folder: Folder | null; books: Book[] }> {
		const files = this.getFilesFromDirectory(directoryPath);

		if (await this.folderRepository.findByPath(directoryPath)) return { folder: null, books: [] };

		const [folder, books] = await Promise.all([
			this.folderRepository.create({ path: directoryPath }),
			this.indexFiles(files),
		]);

		return { folder, books };
	}

	async indexFiles(files: string[]): Promise<Book[]> {
		const books = await Promise.all(
			files.map((file) => this.indexFile(file)),
		);

		return books.filter((book): book is Book => book !== null);
	}

	async indexFile(file: string): Promise<Book | null> {
		if (await this.bookRepository.findByPath(file)) return null;

		const metadata = await this.extractMetadata(file);

		return this.bookRepository.create(metadata);
	}

	private getFilesFromDirectory(directoryPath: string): string[] {
		return fs
			.readdirSync(directoryPath)
			.filter((file) => this.isValidEbook(file))
			.map((file) => path.join(directoryPath, file));
	}

	private isValidEbook(file: string): boolean {
		const extension = path.extname(file).toLowerCase().slice(1);
		return ALLOWED_EBOOK_EXTENSIONS.includes(extension);
	}

	async extractMetadata(filePath: string): Promise<Omit<Book, 'id'>> {
		const format = path.extname(filePath).slice(1);

		let ebookService: EpubService;
		let metadata = {
			path: filePath,
			format,
		} as Omit<Book, 'id'>;

		switch (format) {
			case 'epub':
				ebookService = new EpubService(filePath);
				metadata = {
					...metadata,
					...(await ebookService.extractMetadata()),
				};
				break;
			default:
				throw new Error(`Unsupported format: ${format}`);
		}

		return metadata;
	}
}