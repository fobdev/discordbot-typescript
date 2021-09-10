import { MessageEmbed, Permissions } from "discord.js";
import { CommandInt } from "../../interfaces/CommandInt";

export const RenameServer: CommandInt = {
    name: "renameserver",
    description: "Renames the server (admin).",
    run: async (client, message) => {
        let { content, member, author, guild, channel } = message;
        if (!member?.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Permission denied.")
                        .setDescription(
                            "The user does not have permission to manage the server name."
                        )
                        .setColor("RED"),
                ],
            });
        }

        let newname = content.split(" ").slice(1).join(" ");

        return guild
            ?.setName(newname)
            .then((updated) => {
                channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("The server name has changed!")
                            .setDescription(
                                `**${author.tag}** changed the name of the server to **${newname}**`
                            )
                            .setColor("GREEN"),
                    ],
                });
            })
            .catch((err) => {
                return channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("An error occured trying to change the name")
                            .setDescription("Try using another name.")
                            .setColor("RED"),
                    ],
                });
            });
    },
};
