import { registerAs } from "@nestjs/config";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import validateConfig from "src/utils/validate-config";
import { AppConfig } from "./app-config.type";
import CONSTANTS from "src/common/constants";

enum Environment {
    Development = "development",
    Production = "production",
    Local = "local"
}  

class EnvironmentVariablesValidator {
    @IsEnum(Environment)
    @IsOptional()
    NODE_ENV: Environment;

    @IsInt()
    @IsOptional()
    PORT: number;

    @IsString()
    @IsOptional()
    API_PREFIX: string;
}

export default registerAs<AppConfig>("app", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || Environment.Development,
    name: process.env.APPLICATION_NAME || CONSTANTS.APPLICATION_NAME,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : CONSTANTS.PORT,
    apiPrefix: process.env.API_PREFIX || CONSTANTS.API_PREFIX,
  };
});