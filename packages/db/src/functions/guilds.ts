import { db } from "../connectors/pool";
import { guilds } from "../../schema/guilds";

async function getGuild(guildId) {
  const guild = await db.select().from(guilds).limit(1);
  return guild;
}
