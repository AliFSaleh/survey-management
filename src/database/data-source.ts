import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "src"
  },
  extra: {
    // max connection pool size
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100
  }
} as DataSourceOptions);
