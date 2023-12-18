import { db } from "../connectors/pool.js";
import { guilds } from "../../schema/guilds.js";

async function getGuild(guildId) {
  const guild = await db.select().from(guilds).limit(1);
  return guild;
}
