import { PrismaClient } from '@prisma/client';

export default class PrismaService extends PrismaClient {
	private static instance: PrismaService;

	private constructor() {
		super();
	}

	public static getInstance(): PrismaService {
		if (!PrismaService.instance) {
			PrismaService.instance = new PrismaService();
		}
		return PrismaService.instance;
	}
}
