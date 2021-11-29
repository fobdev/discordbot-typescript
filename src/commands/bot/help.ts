import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";
import { Response } from "../../models";
import { CommandList } from "../_CommandList";
import { readdir } from "fs/promises";

// FS to get the outside dependencies
const getCommandsFrom = async (
    prefix: string,
    emoji: string,
    folder: string,
    embed: MessageEmbed
) => {
    let commandsArray: Array<string> = [];

    try {
        await readdir(`./src/commands/${folder}/`).then((files) => {
            if (files.length === 0) throw new Error("Nothing was found inside the directory");
            files.forEach((file) => {
                if (file !== "index.ts") commandsArray.push(file.slice(0, file.length - 3));
            });
        });
    } catch (error) {
        console.error(error);
    }

    return embed.addField(
        `${emoji} ${folder.at(0)?.toUpperCase() + folder.slice(1)} ${
            folder.includes("music") ? `[${prefix}play]` : ""
        }`,
        "``" + commandsArray.join("`` | ``") + "``",
        true
    );
};

export const Help: Command = {
    name: ["help"],
    arguments: ["?", "command"],
    description: "Display all the available commands.",
    run: async (prefix, client, message, args) => {
        let { channel } = message;

        if (args?.length! > 0)
            for (const Command of CommandList) {
                let usageHelper = () => {
                    let finalString: string = "";
                    Command.name.forEach((element) => {
                        if (Command.arguments?.length! > 0) {
                            if (Command.arguments!.find((opt) => opt === "?")) {
                                finalString += "```" + `${prefix}${element}\n` + "```";

                                finalString +=
                                    "```" +
                                    `${prefix}${element} [${Command.arguments
                                        ?.slice(1)
                                        .join("], [")}]\n` +
                                    "```";
                            } else
                                finalString +=
                                    "```" +
                                    `${prefix}${element} [${Command.arguments?.join("], [")}]\n` +
                                    "```";
                        } else finalString += "```" + `${prefix}${element}\n` + "```";
                    });
                    return finalString;
                };

                if (Command.name.find((element) => element === args![0]))
                    return channel.send({
                        embeds: [
                            Response(
                                Command.name[0].toUpperCase(),
                                Command.description,
                                "OTHER"
                            ).addField("Usage", usageHelper()),
                        ],
                    });
            }

        const fob = client.users.cache.find((u) => u.id === "244270921286811648");
        let generatedResponse = Response(
            `${client.user?.username.toUpperCase()} Commands List`,
            `This is a complete list of all the commands available from ${client.user?.username}\n` +
                "**:blue_circle: Useful info:\n:arrow_right: Server prefix: ``" +
                prefix +
                "``\n:arrow_right: Change prefix: ``" +
                `${prefix}prefix [new prefix]` +
                "``\n:arrow_right: Help from command: ``" +
                `${prefix}help [command]` +
                "``**",
            "SUCCESS"
        )
            .setFooter(
                `Developed by ${fob ? fob.tag : "Fobenga"} | https://github.com/fobdev/`,
                fob?.displayAvatarURL()
            )
            .setThumbnail(client.user?.avatarURL({ size: 2048 })!);

        await getCommandsFrom(prefix, ":shield:", "admin", generatedResponse);
        await getCommandsFrom(prefix, ":robot:", "bot", generatedResponse);

        return channel.send({
            embeds: [generatedResponse],
        });
    },
};
