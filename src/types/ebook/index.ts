export type TOCElement = {
	id: string;
	title: string;
	href: string;
};

export type TOC = TOCElement[];

export type { Book } from '@prisma/client';
