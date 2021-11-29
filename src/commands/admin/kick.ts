import { Command } from "../../interfaces";
import { Response } from "../../models";
import { onError } from "../../events";
import { Permissions } from "discord.js";

export const Kick: Command = {
    name: ["kick"],
    arguments: ["member"],
    description: "Kick a user from the server.",
    run: async (prefix, client, message) => {
        let { channel, author, member } = message;
        if (!member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return channel.send({
                embeds: [
                    Response(
                        "Permission Denied",
                        "The user does not have permission to kick members.",
                        "FAIL"
                    ),
                ],
            });
        }

        let kick_member = message.mentions.members?.first();

        if (!kick_member)
            return channel.send({
                embeds: [
                    Response(
                        "Error running the command",
                        "You need to tag a user to be kicked!",
                        "FAIL"
                    ),
                ],
            });

        try {
            await kick_member?.kick();
            console.log("[KICK]: A user was successfully kicked from the server.");
            return channel.send({
                embeds: [
                    Response(
                        "Member kicked from the server",
                        `**<@${author.id}>** kicked **<@${kick_member?.user.id}>** from the server.`,
                        "WARN"
                    ).setThumbnail(kick_member?.user.displayAvatarURL({ size: 2048 })!),
                ],
            });
        } catch (e: any) {
            console.error(`[KICK]: Error kicking a user: ${e.message}.`);
            return onError(message, e);
        }
    },
};
