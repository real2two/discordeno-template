import { db } from "../connectors/pool.ts";
import { guilds } from "../../schema/guilds.ts";

async function getGuild(guildId) {
  const guild = await db.select().from(guilds).limit(1);
  return guild;
}
