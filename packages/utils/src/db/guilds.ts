import { eq } from "drizzle-orm";
import { db, Tables } from "@/db";

/**
 * Get a guild or create one
 * @param guildId The guild ID
 * @returns The guild's information in the database
 */
export async function getGuild(guildId: bigint) {
  // Attempts to fetch guild
  const guild = await selectGuild(guildId);

  // If guild doesn't exist, create it and attempt to fetch it again
  if (!guild) {
    await createGuild(guildId);
    return selectGuild(guildId);
  }

  // Return the guild
  return guild;
}

/**
 * Select a guild
 * @param guildId The guild ID
 * @returns The guild's information if it exists
 */
export async function selectGuild(guildId: bigint) {
  // Attempts to fetch guild
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
export async function createGuild(guildId: bigint) {
  // Inserts the guild into the database
  return await db.insert(Tables.guilds).values({
    guildId,
  });
}

/**
 * Updates a guild's information
 * @param guildId The guild ID
 * @param data The updated guild's information
 */
export async function updateGuild(
  guildId: bigint,
  data: Partial<typeof Tables.guilds.$inferSelect>,
) {
  // Update a guild table
  return await db
    .update(Tables.guilds)
    .set(data)
    .where(eq(Tables.guilds.guildId, guildId));
}
