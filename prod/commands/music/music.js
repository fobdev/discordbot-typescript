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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
exports.Music = {
    name: "music",
    description: "Play music!",
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // parse youtube URL
        let { author, content, channel, member, guild } = message;
        if (channel.type == "DM")
            return;
        let argument = content.split(" ").slice(1).join("");
        let arglist = ["leave"];
        // checks if the youtube link is valid
        const ytb_regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if (!argument.match(ytb_regex) &&
            argument != arglist.find((element) => element === argument)) {
            return channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Error with the link!")
                        .setDescription("Please use a valid YouTube link.")
                        .setColor("RED"),
                ],
            });
        }
        else {
            let vc = (0, voice_1.joinVoiceChannel)({
                channelId: (_a = member === null || member === void 0 ? void 0 : member.voice.channel) === null || _a === void 0 ? void 0 : _a.id,
                guildId: message.guild.id,
                adapterCreator: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.voiceAdapterCreator,
            });
            if (argument === "leave")
                vc.destroy();
            else {
                const player = (0, voice_1.createAudioPlayer)();
                const resource = (0, voice_1.createAudioResource)((0, ytdl_core_1.default)(argument));
                player.play(resource);
                vc.subscribe(player);
            }
        }
    }),
};
