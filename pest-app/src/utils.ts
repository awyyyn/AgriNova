export function getFirstNameFromEmail(email: string) {
	const localPart = email.split("@")[0];

	const firstName = localPart.split(/[._-]/)[0].replace(/\d+/g, ""); // remove numbers

	return firstName
		? firstName.charAt(0).toUpperCase() + firstName.slice(1)
		: "User";
}
