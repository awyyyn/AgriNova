import { Prisma, User } from "../types/index.js";
import { prisma } from "../configs/prisma.js";

interface ReadUsers {
	pagination?: {
		page: number;
		limit: number;
	};
	query?: string;
	role?: User["role"][];
}

export const readUsers = async ({
	pagination,
	query,
	role,
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

	if (role) {
		where.role = {
			in: role,
		};
	}

	const users = await prisma.user.findMany({
		omit: {
			password: true,
		},
		where,
		skip: pagination ? pagination.limit * pagination?.page : undefined,
		take: pagination ? pagination.limit : undefined,
	});

	const total = await prisma.user.count({ where });

	return {
		data: users,
		hasNextPage: users.length === pagination?.limit,
		total,
	};
};
