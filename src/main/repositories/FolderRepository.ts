import { Folder } from '@prisma/client';
import PrismaService from '@services/PrismaService';
import AbstractSingleton from '@utils/AbstractSingleton';

export default class FolderRepository extends AbstractSingleton {
	private prismaService: PrismaService;

	constructor() {
		super();
		this.prismaService = PrismaService.getInstance();
	}

	public static getInstance(): FolderRepository {
		return FolderRepository._getInstance<FolderRepository>();
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
