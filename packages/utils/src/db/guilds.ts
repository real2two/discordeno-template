import { eq } from "drizzle-orm";
import { db, Tables } from "@/db";

/**
 * Get a guild or create one
 * @param guildId The guild ID
 * @returns The guild's information
 */
export async function fetchGuild(guildId: bigint) {
  // Attempts to fetch guild
  const guild = await getGuild(guildId);

  // If guild doesn't exist, create it and attempt to fetch it again
  if (!guild) {
    await createGuild({ guildId });
    return getGuild(guildId);
  }

  // Return the guild
  return guild;
}

/**
 * Select a guild
 * @param guildId The guild ID
 * @returns The guild's information if it exists
 */
export async function getGuild(guildId: bigint) {
  return (
    await db
      .select()
      .from(Tables.guilds)
      .where(eq(Tables.guilds.guildId, guildId))
      .limit(1)
  )[0];
}

/**
 * Create a guild on the database
 * @param guildId The guild ID
 */
export async function createGuild(data: typeof Tables.guilds.$inferInsert) {
  return await db.insert(Tables.guilds).values(data);
}

/**
 * Updates a guild's information
 * @param data The updated guild's information
 */
export async function updateGuild(
  data: Partial<typeof Tables.guilds.$inferInsert> & {
    guildId: typeof Tables.guilds.$inferInsert.guildId;
  },
) {
  return await db
    .update(Tables.guilds)
    .set(data)
    .where(eq(Tables.guilds.guildId, data.guildId));
}
