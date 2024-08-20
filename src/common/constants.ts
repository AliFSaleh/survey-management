import * as dotenv from "dotenv";

dotenv.config();

const SALT = process.env.SALT || "";
const PEPPER = process.env.PEPPER || "";
const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = "4h";
const PORT = 5001;
const API_PREFIX = "api";
const APPLICATION_NAME = "voy-finance";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";


const CONSTANTS = {
  PORT,
  API_PREFIX,
  APPLICATION_NAME,
  SALT,
  PEPPER,
  SALT_ROUNDS,
  JWT_ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
};

export default CONSTANTS;
