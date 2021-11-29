import { Guild } from "discord.js";
import { PoolClient as PostgresClient } from "pg";

export const createGuild = (postgres: PostgresClient, guild: Guild) => {
    return postgres.query(`INSERT INTO guilds(id, prefix, locale) VALUES (${guild.id}, '>', 'en')`);
};

export const deleteGuild = (postgres: PostgresClient, guild: Guild) => {
    return postgres.query(`DELETE FROM guilds WHERE id=${guild.id}`);
};

export const getPrefix = async (postgres: PostgresClient, guild: Guild) => {
    const response = await postgres.query({
        rowMode: "array",
        text: `SELECT prefix FROM guilds WHERE id=${guild.id}`,
    });
    return response.rows[0][0];
};

export const setPrefix = (postgres: PostgresClient, guild: Guild, newPrefix: string) => {
    return postgres.query(`UPDATE guilds SET prefix='${newPrefix}' WHERE id=${guild.id}`);
};
