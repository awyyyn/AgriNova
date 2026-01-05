import * as bcrypt from "bcrypt";

/**
 * Hashes a plain-text password using a salt.
 *
 * @example
 * // Usage in an authentication flow
 * const hashedPassword = await hashPassword("securePassword123");
 * console.log(hashedPassword); // "$2b$10$..."
 */
export const hashPassword = async (password: string) => {
  const rounds = process.env.SALT || 10;

  const salt = await bcrypt.genSalt(Number(rounds));

  return bcrypt.hash(password, salt);
};

/**
 * Checks password if correct
 */
export const checkPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(password, hashedPassword);
};
