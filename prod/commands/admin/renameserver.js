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
exports.RenameServer = void 0;
const discord_js_1 = require("discord.js");
exports.RenameServer = {
    name: "renameserver",
    description: "Renames the server (admin).",
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        let { content, member, author, guild, channel } = message;
        if (!(member === null || member === void 0 ? void 0 : member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_GUILD))) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Permission denied.")
                        .setDescription("The user does not have permission to manage the server name.")
                        .setColor("RED"),
                ],
            });
        }
        let newname = content.split(" ").slice(1).join(" ");
        return guild === null || guild === void 0 ? void 0 : guild.setName(newname).then((updated) => {
            channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("The server name has changed!")
                        .setDescription(`**${author.tag}** changed the name of the server to **${newname}**`)
                        .setColor("GREEN"),
                ],
            });
        }).catch((err) => {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("An error occured trying to change the name")
                        .setDescription("Try using another name.")
                        .setColor("RED"),
                ],
            });
        });
    }),
};
