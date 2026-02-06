import { Prisma, User } from "../types/index.js";
import { prisma } from "../configs/prisma.js";
import { endOfMinute } from "date-fns";

interface ReadUsers {
	pagination?: {
		page: number;
		limit: number;
	};
	query?: string;
	roles?: User["role"][];
}

export const readUsers = async ({
	pagination,
	query,
	roles,
}: ReadUsers = {}) => {
	let where: Prisma.UserWhereInput = {};

	if (query) {
		where = {
			OR: [
				{ firstName: { contains: query } },
				{ lastName: { contains: query } },
				{ email: { contains: query } },
			],
		};
	}

	if (roles?.length) {
		where.role = {
			in: roles,
		};
	}

	const users = await prisma.user.findMany({
		omit: {
			password: true,
		},
		where,
		skip: pagination
			? Number(pagination.limit) * Number(pagination?.page || 0)
			: undefined,
		take: pagination ? Number(pagination.limit) : undefined,
	});

	const total = await prisma.user.count({ where });
	const totalPages = pagination
		? Math.ceil(total / Number(pagination.limit))
		: 1;

	return {
		data: users,
		total,
		page: pagination?.page || 0,
		limit: pagination?.limit || 10,
		totalPages,
	};
};

export const readUser = async (id: string) => {
	let where: Prisma.UserWhereUniqueInput = {
		id: id,
	};

	if (id.includes("@")) {
		where = {
			email: id,
		};
	}

	return await prisma.user.findUnique({ where, omit: { password: true } });
};

export async function getUsersByRole() {
	const usersByRole = await prisma.user.groupBy({
		by: ["role"],
		_count: true,
	});

	// Convert to object format
	const distribution = {
		USER: 0,
		ADMIN: 0,
		SUPER_ADMIN: 0,
	};

	usersByRole.forEach((item) => {
		distribution[item.role] = item._count;
	});

	return distribution;
}
