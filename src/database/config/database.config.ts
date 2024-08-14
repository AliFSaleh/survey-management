import { registerAs } from "@nestjs/config";
import { IsInt, IsString, IsBoolean, IsOptional } from "class-validator";
import validateConfig from "../../utils/validate-config";
import { DatabaseConfig } from "./database-config.type";

class EnvironmentVariablesValidator {
  @IsString()
  DATABASE_TYPE: string;

  @IsString()
  DATABASE_HOST: string;

  @IsInt()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number;
}

export default registerAs<DatabaseConfig>("database", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: process.env.DATABASE_SYNCHRONIZE === "false",
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100
  };
});
