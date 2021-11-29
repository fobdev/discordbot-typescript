import { MessageActionRow, MessageButton, Permissions } from "discord.js";
import { Command } from "../../interfaces";
import { Response } from "../../models";

export const Clear: Command = {
    name: ["clear", "cl"],
    arguments: ["amount"],
    description: "Clear a specific amount of messages from the channel",
    run: async (prefix, client, message, args) => {
        const { channel, member } = message;
        if (channel.type === "DM") return;

        if (!member!.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
            return channel.send("The user does not have permission to delete messages.");

        if (args?.length === 0 || parseInt(args![0]) > 100 || parseInt(args![0]) < 1)
            return channel.send({
                embeds: [Response("Error", "Must input a number between 1 and 100", "FAIL")],
            });

        const amount = parseInt(args![0]);

        let amount_deleted = 0;
        try {
            message.delete();
            await channel.bulkDelete(amount, true).then(async (messages) => {
                amount_deleted = messages.size;
            });
        } catch (error: any) {
            console.error(`[CLEAR] Error deleting messages: ${error.message}`);
            return channel.send({
                embeds: [
                    Response("Error", "You need to input a valid number of messages.", "FAIL"),
                ],
            });
        }

        let return_embed = Response(
            "Messages were deleted from the text channel.",
            `**${amount_deleted} messages** deleted by **${message.author.tag}**`,
            "SUCCESS"
        );

        if (amount_deleted != amount)
            return_embed.setFooter(
                "Note: messages older than 14 days can't be deleted by the bot."
            );

        const deleteButton = new MessageButton()
            .setCustomId(Math.random().toString())
            .setLabel("Delete this message")
            .setStyle("SECONDARY");

        return channel
            .send({
                embeds: [return_embed],
                components: [new MessageActionRow().addComponents(deleteButton)],
            })
            .then((msg) => {
                if (!msg.deleted)
                    msg.awaitMessageComponent({
                        componentType: "BUTTON",
                        filter: (filter) => filter.customId === deleteButton.customId,
                    })
                        .then(() => {
                            if (!msg.deleted)
                                msg.delete().catch((e) =>
                                    console.error(`${e}: Error deleting message`)
                                );
                        })
                        .catch(() => {
                            console.log("[COLLECTOR]: Button Collector Deleted");
                        });
            });
    },
};
