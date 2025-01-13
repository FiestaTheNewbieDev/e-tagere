import PrismaService from '@main/services/PrismaService';
import { Folder } from '@prisma/client';

export default class FolderRepository {
	private static instance: FolderRepository;
	private prismaService: PrismaService;

	private constructor() {
		this.prismaService = PrismaService.getInstance();
	}

	public static getInstance(): FolderRepository {
		if (!FolderRepository.instance) {
			FolderRepository.instance = new FolderRepository();
		}
		return FolderRepository.instance;
	}

	async create(data: Omit<Folder, 'id'>): Promise<Folder> {
		return this.prismaService.folder.create({
			data,
		});
	}

	async findByPath(path: string): Promise<Folder | null> {
		return this.prismaService.folder.findFirst({
			where: {
				path,
			},
		});
	}

	async findAll(): Promise<Folder[]> {
		return this.prismaService.folder.findMany();
	}
}
