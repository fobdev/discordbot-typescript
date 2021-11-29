import { Permissions } from "discord.js";
import { onError } from "../../events";
import { Command } from "../../interfaces";
import { Response } from "../../models";

export const Ban: Command = {
    name: ["ban"],
    arguments: ["member"],
    description: "Bans a user from the server",
    run: async (prefix, client, message, args) => {
        let { channel, author, member, mentions } = message;

        if (!member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return channel.send({
                embeds: [
                    Response(
                        "Permission Denied",
                        "The member does not have permission to kick members.",
                        "FAIL"
                    ),
                ],
            });
        }

        let ban_member = mentions.members?.first();
        if (!ban_member) {
            return channel.send({
                embeds: [
                    Response(
                        "Error running the command",
                        "You need to tag a member to be banned!",
                        "FAIL"
                    ),
                ],
            });
        }

        let reason = args!.slice(1);
        if (reason.length === 0) {
            try {
                await ban_member.ban();
                console.log("[BAN]: A user was successfully banned from the server.");
                return channel.send({
                    embeds: [
                        Response(
                            "User banned!",
                            `**${author.tag}** banned **${ban_member.user.tag}** from the server.`,
                            "SUCCESS"
                        ),
                    ],
                });
            } catch (e: any) {
                console.error(`[BAN]: Error banning a user: ${e.message}.`);
                return onError(message, e);
            }
        }
        try {
            await ban_member.ban({ reason: reason.join(" ") });
            console.log("[BAN]: A user was successfully banned from the server.");
            return channel.send({
                embeds: [
                    Response(
                        "User banned!",
                        `**${author.tag}** banned **${ban_member.user.tag}** from the server`,
                        "SUCCESS"
                    ).addField("Reason: ", reason.join(" "), true),
                ],
            });
        } catch (e: any) {
            console.error(`[BAN]: Error banning a user: ${e.message}.`);
            return onError(message, e);
        }
    },
};
