import { PrismaClient } from "../src/generated/prisma/client";
const prisma = new PrismaClient();
async function main() {
	const user = await prisma.user.upsert({
		where: { email: "aajn.team@gmail.com" },
		update: {},
		create: {
			email: "aajn.team@gmail.com",
			password: "$2b$10$HBE8/aFxFQ0jbJn7ZadtF.Np1j6REJCgmf73Bp89yWrbefYykRq9W",
			id: "64c13ab08edf48a008793cac",
			firstName: "administrator",
			lastName: "administrator",
			role: "SUPER_ADMIN",
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
