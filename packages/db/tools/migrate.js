import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from "../src/connectors/connection.js";

await migrate(db, { migrationsFolder: "drizzle/migrations" });

connection.end();
