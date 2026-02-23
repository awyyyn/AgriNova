import { prisma } from "../configs/prisma.js";
import { Plant, Prisma } from "../types/index.js";

interface ReadPlants {
	pagination?: {
		page: number;
		limit: number;
	};
	query?: string;
	userId?: string;
	type?: Plant["type"];
	hasPest?: boolean;
}

export const readPlantAnalysis = async ({
	pagination,
	query,
	userId,
	type,
	hasPest = false,
}: ReadPlants = {}) => {
	let where: Prisma.PlantWhereInput = {};

	if (userId) {
		where.userId = userId;
	}

	if (type) {
		where.type = type;
	}

	if (!!hasPest) {
		where.hasPestFound = true;
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
		skip: pagination
			? Number(pagination.limit) * Number(pagination?.page)
			: undefined,
		take: pagination ? Number(pagination.limit) : undefined,
		orderBy: {
			createdAt: "desc",
		},
	});

	const total = await prisma.plant.count({ where });
	const totalPages = pagination
		? Math.ceil(total / Number(pagination.limit))
		: 1;

	return {
		data: plants,
		totalPages,
		page: pagination?.page || 0,
		limit: pagination?.limit || 10,
		total,
	};
};

export const readPlantAnalysisById = async (id: string) => {
	const plant = await prisma.plant.findUnique({
		where: {
			id,
		},
	});

	return plant;
};

export const updatePlantAnalysis = async (
	id: string,
	data: Partial<Omit<Plant, "id" | "createdAt" | "formattedId" | "userId">>,
) => {
	const updatedData = await prisma.plant.update({
		where: {
			id,
		},
		data,
	});

	if (!updatedData) {
		throw new Error("Failed to update data!");
	}

	return updatedData;
};
