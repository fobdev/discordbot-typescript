import { Client as DiscordClient, Guild } from "discord.js";
import { PoolClient as PostgresClient } from "pg";
import { deleteGuild } from "../db";

export const onGuildDelete = async (
    client: DiscordClient,
    postgres: PostgresClient,
    guild: Guild
) => {
    const guilds = client.guilds.cache;

    await deleteGuild(postgres, guild);
    console.log(`${guild.name} removed from the database.`);

    client.user?.setActivity(`>help @ ${guilds.size} servers`, {
        type: "LISTENING",
    });

    return console.table(guilds.map((guild) => guild.name));
};
