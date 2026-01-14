export function getFirstNameFromEmail(email: string) {
	const localPart = email.split("@")[0];

	const firstName = localPart.split(/[._-]/)[0].replace(/\d+/g, ""); // remove numbers

	return firstName
		? firstName.charAt(0).toUpperCase() + firstName.slice(1)
		: "User";
}

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.normalize("NFD") // normalize accented chars
		.replace(/[\u0300-\u036f]/g, "") // remove accents
		.replace(/[^a-z0-9\s-]/g, "") // remove special chars
		.replace(/\s+/g, "-") // spaces → hyphens
		.replace(/-+/g, "-"); // collapse multiple hyphens
}

export function slugifyFileName(name: string, extension: string): string {
	return `${slugify(name)}.${extension}`;
}
