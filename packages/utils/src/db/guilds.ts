import { eq } from "drizzle-orm";
import { db, Tables } from "@/db";

export async function getGuild(guildId: bigint) {
  // Attempts to fetch guild
  const guild = (
    await db
      .select()
      .from(Tables.guilds)
      .where(eq(Tables.guilds.guildId, guildId))
      .limit(1)
  )[0];

  // If guild doesn't exist, create it and attempt to fetch it again
  if (!guild) {
    await createGuild(guildId);
    return getGuild(guildId);
  }

  // Return the guild
  return guild;
}

export async function createGuild(guildId: bigint) {
  // Inserts the guild into the database
  return await db.insert(Tables.guilds).values({
    guildId,
  });
}
