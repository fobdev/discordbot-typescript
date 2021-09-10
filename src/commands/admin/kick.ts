import { MessageEmbed } from "discord.js";
import { CommandInt } from "../../interfaces/CommandInt";

export const Kick: CommandInt = {
    name: "kick",
    description: "Kick a user from the server.",
    run: async (client, message) => {
        let { channel, author, member } = message;
        if (!member?.permissions.has("KICK_MEMBERS")) {
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Permission Denied")
                        .setDescription("The user does not have permission to kick members.")
                        .setColor("RED"),
                ],
            });
        }

        let kick_member = message.mentions.members?.first();

        if (!kick_member) {
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Error running the command")
                        .setDescription("You need to tag a user to be kicked!")
                        .setColor("RED"),
                ],
            });
        }

        try {
            await kick_member?.kick();
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Member kicked from the server")
                        .setDescription(
                            `**<@${author.tag}>** kicked **<@${kick_member?.user.id}>** from the server.`
                        )
                        .setThumbnail(kick_member?.user.displayAvatarURL({ dynamic: true })!)
                        .setColor("ORANGE"),
                ],
            });
        } catch (e) {
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Error")
                        .setDescription("An error occurred trying to kick the user.")
                        .setColor("RED"),
                ],
            });
        }
    },
};
