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
exports.Ban = void 0;
const discord_js_1 = require("discord.js");
exports.Ban = {
    name: "ban",
    description: "Bans a user from the server",
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let { content, channel, author, member, mentions } = message;
        if (!(member === null || member === void 0 ? void 0 : member.permissions.has("BAN_MEMBERS"))) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Permission Denied")
                        .setDescription("The user does not have permission to kick members.")
                        .setColor("RED"),
                ],
            });
        }
        let ban_member = (_a = mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!ban_member) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Error running the command")
                        .setDescription("You need to tag a user to be banned!")
                        .setColor("RED"),
                ],
            });
        }
        // separate all the string from the function call
        let args = content.split(" ").slice(2);
        if (!args) {
            yield ban_member.ban();
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("User banned!")
                        .setDescription(`**${author.tag}** banned **${ban_member.user.tag}** from the server.`)
                        .setColor("GREEN"),
                ],
            });
        }
        // set the reason to a default of after the ban days
        let ban_days = parseInt(args[0]);
        let ban_reason = args.slice(1, args.length);
        // check if there is a number after the user
        if (isNaN(ban_days)) {
            ban_reason = args;
            // if the reason is the whole args, then there is no day selected (default 0).
            yield ban_member.ban({ reason: ban_reason.toString() });
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("User banned!")
                        .setDescription(`**${author.tag}** banned **${ban_member.user.tag}** from the server`)
                        .addField("Reason: ", ban_reason.toString())
                        .setColor("GREEN"),
                ],
            });
        }
        // now checking the possibility of having a reason and a ban_days
        if (ban_days > 7 || ban_days < 0) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Error executing the command")
                        .setDescription("You can't ban someone for more than 7 days" +
                        "\nBut you can ban someone for a **indefinite amount of time using 0 in the days**")
                        .setColor("RED"),
                ],
            });
        }
        // finally, if there is a reason and a ban_days, do the whole function.
        yield ban_member.ban({ reason: ban_reason.join(" "), days: ban_days });
        return channel.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle("User banned!")
                    .setDescription(`**${author.tag}** banned **${ban_member.user.tag}** from the server`)
                    .addField("Reason: ", ban_reason.join(" "), true)
                    .addField("Days: ", ban_days.toString(), true)
                    .setColor("GREEN"),
            ],
        });
    }),
};
