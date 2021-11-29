import { Client } from "discord.js";

export const onReady = async (client: Client) => {
    const guilds = client.guilds.cache;
    client.user?.setActivity(`>help @ ${guilds.size} servers`, {
        type: "LISTENING",
    });

    console.log(`===== Client connected as [${client.user?.username}] =====`);
    console.table(guilds.map((guild) => guild.name));
};
