import * as dotenv from "dotenv";
import { FindOptionsOrderValue } from "typeorm";

dotenv.config();

const SALT = process.env.SALT || "";
const PEPPER = process.env.PEPPER || "";
const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = "4h";
const PORT = 5001;
const API_PREFIX = "api";
const APPLICATION_NAME = "voy-finance";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";

const ORDER_BY_DESC = "DESC" as FindOptionsOrderValue | undefined;
const ORDER_BY_ASC = "ASC" as FindOptionsOrderValue | undefined;

const PAGE_NUMBER= 1;
const PAGE_SIZE= 10;

const CONSTANTS = {
  PORT,
  API_PREFIX,
  APPLICATION_NAME,
  SALT,
  PEPPER,
  SALT_ROUNDS,
  JWT_ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  PAGE_NUMBER,
  PAGE_SIZE,
  ORDER_BY_DESC,
  ORDER_BY_ASC
};

export default CONSTANTS;
