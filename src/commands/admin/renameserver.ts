import { Permissions } from "discord.js";
import { onError } from "../../events";
import { Command } from "../../interfaces";
import { Response } from "../../models";

export const RenameServer: Command = {
    name: ["renameserver", "rs"],
    arguments: ["new name"],
    description: "Renames the server (admin only).",
    run: async (prefix, client, message, args) => {
        let { member, author, guild, channel } = message;
        if (!member?.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return channel.send({
                embeds: [
                    Response(
                        "Permission denied.",
                        "The user does not have permission to manage the server name.",
                        "FAIL"
                    ),
                ],
            });
        }

        let newname: string = "";
        if (args?.length! > 0) newname = args!.join(" ");
        else return channel.send("Please input a new name for the server.");

        try {
            await guild?.setName(newname);
            return channel.send({
                embeds: [
                    Response(
                        "The server name has changed!",
                        `**${author.tag}** changed the name of the server to **${newname}**`,
                        "SUCCESS"
                    ),
                ],
            });
        } catch (e: any) {
            console.error(`[RENAMESERVER] Error trying to rename the server: ${e.message}`);
            return onError(message, e);
        }
    },
};
