import { Client, Message } from "discord.js";
import { PoolClient } from "pg";
import { CommandList } from "../commands/_CommandList";
import { getPrefix } from "../db";

export const onMessage = async (client: Client, message: Message, postgres: PoolClient) => {
    let { author, channel } = message;
    const content = message.content.toLowerCase();

    const prefix = await getPrefix(postgres, message.guild!);

    // prefix help for when forgetting it
    if (prefix !== ">" && content.startsWith(">prefix"))
        await channel.send(`The prefix for this server is [**${prefix}**]`);

    const args = content.split(" ").slice(1);

    if (!content.startsWith(prefix)) return;
    if (author.bot) return;

    for (const Command of CommandList) {
        Command.name.forEach(async (element) => {
            const filterSingle = Command.name.filter(
                (val) => val === content.split(" ")[0].substring(prefix.length)
            );

            if (element === filterSingle[0]) {
                console.log(`\n[${message.content}] command used`);
                console.group();
                console.log(`User: [${message.author.tag}]`);
                console.log(`Serv: [${message.guild?.name}]`);

                const chan: any = channel;
                console.log(`Chan: [#${chan.name}]`);

                console.log(
                    `Time: [${new Date().toLocaleTimeString(
                        "pt-BR"
                    )} at ${new Date().toLocaleDateString("pt-BR")}]`
                );
                console.groupEnd();

                return await Command.run(prefix, client, message, args, postgres);
            }
        });
    }

    return console.log(`${message.author.tag} just said [${message.content}]`);
};
