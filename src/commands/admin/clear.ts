import { MessageEmbed, Permissions } from "discord.js";
import { CommandInt } from "../../interfaces/CommandInt";

export const Clear: CommandInt = {
    name: "clear",
    description: "Clear a specific amount of messages from the channel",
    run: async (client, message) => {
        let { channel, content } = message;
        const amount: number = parseInt(content.split(" ").slice(1).toString());

        // requirements
        if (channel.type == "DM") return;
        if (!message.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
            return channel.send("The user does not have permission to delete messages.");
        if (isNaN(amount) || !amount) return channel.send("Please input a valid number");
        if (amount > 100)
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Error deleting messages.")
                        .setDescription(
                            "You can only delete a **maximum of 100 messages** at a time."
                        )
                        .setColor("RED"),
                ],
            });

        // deletes the command message then bulk delete.
        await message.delete();
        let amount_deleted: number = 0;
        await channel.bulkDelete(amount, true).then(async (message) => {
            amount_deleted = message.size;
        });

        let return_embed = new MessageEmbed()
            .setTitle("Messages were deleted from the text channel.")
            .setDescription(
                `**${amount_deleted} messages** deleted by **${message.author.tag}**`
            )
            .setColor("GREEN");

        if (amount_deleted != amount) {
            return_embed.setFooter(
                "Note: messages older than 14 days can't be deleted by the bot."
            );
        }

        return channel.send({
            embeds: [return_embed],
        });
    },
};
