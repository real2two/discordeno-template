import env from "@/env";

export default {
  schema: "./schema/**/*",
  out: "./drizzle/migrations",
  driver: "mysql2",
  dbCredentials: {
    host: env.DatabaseHost,
    user: env.DatabaseUser,
    password: env.DatabasePassword,
    database: env.DatabaseName,
  },
};
