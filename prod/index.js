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
const discord_js_1 = require("discord.js");
const onMessage_1 = require("./events/onMessage");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = new discord_js_1.Client({
        intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
    });
    // calls when the client starts
    client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () { return console.log("Client is Online!"); }));
    // calls when a new message is sent in any channel
    client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, onMessage_1.onMessage)(client, message); }));
    yield client.login(process.env.BOT_TOKEN);
}))();
