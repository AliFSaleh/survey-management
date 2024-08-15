import * as dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const API_PREFIX = "api";
const APPLICATION_NAME = "rob-quiz";
const SALT = process.env.SALT || "";
const PEPPER = process.env.PEPPER || "";

const CONSTANTS = {
  PORT,
  API_PREFIX,
  APPLICATION_NAME,
  SALT,
  PEPPER
};

export default CONSTANTS;
