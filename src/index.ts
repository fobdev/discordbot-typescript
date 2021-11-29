import { Client, Intents } from "discord.js";
import { Pool } from "pg";
import { onReady, onGuildDelete, onGuildCreate, onMessage } from "./events";

(async () => {
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES,
        ],
    });

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    const postgres = await pool.connect();

    client.on("ready", async () => await onReady(client));

    client.on("guildCreate", async (guild) => await onGuildCreate(client, postgres, guild));

    client.on("guildDelete", async (guild) => await onGuildDelete(client, postgres, guild));

    client.on("messageCreate", async (message) => await onMessage(client, message, postgres));

    await client.login(process.env.BOT_TOKEN);
})();
