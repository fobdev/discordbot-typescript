"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clear = void 0;
const discord_js_1 = require("discord.js");
exports.Clear = {
    name: "clear",
    description: "Clear a specific amount of messages from the channel",
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let { channel, content } = message;
        const amount = parseInt(content.split(" ").slice(1).toString());
        // requirements
        if (channel.type == "DM")
            return;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)))
            return channel.send("The user does not have permission to delete messages.");
        if (isNaN(amount) || !amount)
            return channel.send("Please input a valid number");
        if (amount > 100)
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Error deleting messages.")
                        .setDescription("You can only delete a **maximum of 100 messages** at a time.")
                        .setColor("RED"),
                ],
            });
        // deletes the command message then bulk delete.
        yield message.delete();
        let amount_deleted = 0;
        yield channel.bulkDelete(amount, true).then((message) => __awaiter(void 0, void 0, void 0, function* () {
            amount_deleted = message.size;
        }));
        let return_embed = new discord_js_1.MessageEmbed()
            .setTitle("Messages were deleted from the text channel.")
            .setDescription(`**${amount_deleted} messages** deleted by **${message.author.tag}**`)
            .setColor("GREEN");
        if (amount_deleted != amount) {
            return_embed.setFooter("Note: messages older than 14 days can't be deleted by the bot.");
        }
        return channel.send({
            embeds: [return_embed],
        });
    }),
};
