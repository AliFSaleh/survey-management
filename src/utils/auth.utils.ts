import * as crypto from "crypto";
import CONSTANTS from "src/common/constants";
import { RoleEnum } from "src/user/enums/role.enum";

/**
 * Function encrypts password using "crypto"
 * to hash password with pepper and salt
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPasswordWithSaltAndPepper(
  password: string
): Promise<string> {
  return crypto
    .pbkdf2Sync(
      password + CONSTANTS.PEPPER,
      CONSTANTS.SALT,
      10000,
      64,
      "sha512"
    )
    .toString("hex");
}

/**
 * Function to compare a password that is sent by the frontend,
 * it will add pepper to it and compare it with hashed password into the database
 * @param {string} sentPassword
 * @param {string} storedPasswordHash
 * @returns {Promise<boolean>}
 */
export async function validatePassword(
  sentPassword: string,
  storedPasswordHash: string
): Promise<boolean> {
  return (
    (await hashPasswordWithSaltAndPepper(sentPassword)) == storedPasswordHash
  );
}

/**
 * Function to validate token properties that are sent by the frontend.
 * @param {any} token
 * @returns {boolean}
 */
export function validateTokenProperties(token: any): boolean {
  return token.id
    ? true
    : false && token.role
    ? true
    : false && Object.values(token.role).includes(RoleEnum);
}