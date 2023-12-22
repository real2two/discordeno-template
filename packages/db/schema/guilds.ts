import { bigint, primaryKey, mysqlTable } from "drizzle-orm/mysql-core";

export const guilds = mysqlTable(
  "guilds",
  {
    guildId: bigint("guild_id", { mode: "bigint", unsigned: true }).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      name: "guilds_pk",
      columns: [table.guildId],
    }),
  }),
);
