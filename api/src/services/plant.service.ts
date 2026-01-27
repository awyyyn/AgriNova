import { prisma } from "@src/configs/prisma.js";
import { Prisma } from "@src/types/index.js";

interface ReadPlants {
	pagination?: {
		page: number;
		limit: number;
	};
	query?: string;
	userId?: string;
}

export const readPlantAnalysis = async ({
	pagination,
	query,
	userId,
}: ReadPlants = {}) => {
	let where: Prisma.PlantWhereInput = {};

	if (userId) {
		where.userId = userId;
	}

	if (query) {
		where.OR = [
			{ plantIdentification: { commonName: query } },
			{ plantIdentification: { scientificName: query } },
			{ formattedId: { equals: query } },
		];
	}

	const plants = await prisma.plant.findMany({
		where,
		skip: pagination ? pagination.limit * Number(pagination?.page) : undefined,
		take: pagination ? Number(pagination.limit) : undefined,
	});

	const total = await prisma.plant.count({ where });

	return {
		data: plants,
		hasNextPage: plants.length === Number(pagination?.limit),
		total,
	};
};
