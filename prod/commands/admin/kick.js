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
exports.Kick = void 0;
const discord_js_1 = require("discord.js");
exports.Kick = {
    name: "kick",
    description: "Kick a user from the server.",
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let { channel, author, member } = message;
        if (!(member === null || member === void 0 ? void 0 : member.permissions.has("KICK_MEMBERS"))) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Permission Denied")
                        .setDescription("The user does not have permission to kick members.")
                        .setColor("RED"),
                ],
            });
        }
        let kick_member = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!kick_member) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Error running the command")
                        .setDescription("You need to tag a user to be kicked!")
                        .setColor("RED"),
                ],
            });
        }
        try {
            yield (kick_member === null || kick_member === void 0 ? void 0 : kick_member.kick());
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Member kicked from the server")
                        .setDescription(`**<@${author.tag}>** kicked **<@${kick_member === null || kick_member === void 0 ? void 0 : kick_member.user.id}>** from the server.`)
                        .setThumbnail(kick_member === null || kick_member === void 0 ? void 0 : kick_member.user.displayAvatarURL({ dynamic: true }))
                        .setColor("ORANGE"),
                ],
            });
        }
        catch (e) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Error")
                        .setDescription("An error occurred trying to kick the user.")
                        .setColor("RED"),
                ],
            });
        }
    }),
};
