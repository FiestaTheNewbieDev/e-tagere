export type TOCElement = {
	id: string;
	title: string;
	href: string;
};

export type TOC = TOCElement[];
export type ManifestEntry = { id: string; href: string };

export type { Book } from '@prisma/client';
