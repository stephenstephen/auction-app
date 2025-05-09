import { Options, UnderscoreNamingStrategy } from "@mikro-orm/core";
import { AuctionEntity, BidEntity, UserEntity } from "./entities";
import path from "path";

export default {
  type: "postgresql",
  entities: [UserEntity, AuctionEntity, BidEntity],
  dbName: process.env.DB_NAME || "auction-db",
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  namingStrategy: UnderscoreNamingStrategy,
  debug: process.env.NODE_ENV !== "production",
  forceUtcTimezone: true,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "db_migrations",
    path: path.join(__dirname, "migrations"),
    transactional: true,
    disableForeignKeys: true,
  },
  allowGlobalContext: true,
} as Options;
