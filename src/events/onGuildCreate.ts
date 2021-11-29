import { Client as DiscordClient, Guild } from "discord.js";
import { PoolClient as PostgresClient } from "pg";
import { createGuild } from "../db";

export const onGuildCreate = async (
    client: DiscordClient,
    postgres: PostgresClient,
    guild: Guild
) => {
    const guilds = client.guilds.cache;

    await createGuild(postgres, guild);
    console.log(`${guild.name} added to the database.`);

    client.user?.setActivity(`>help @ ${guilds.size} servers`, {
        type: "LISTENING",
    });

    console.log(`==========\nClient added to: [${guild.name}]\n==========`);
    console.table(guilds.map((guild) => guild.name));
};
