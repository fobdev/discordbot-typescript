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
exports.onMessage = void 0;
const _CommandList_1 = require("../commands/_CommandList");
const onMessage = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = ">";
    if (!message.content.startsWith(prefix))
        return;
    if (message.author.bot)
        return;
    for (const Command of _CommandList_1.CommandList) {
        if (message.content.startsWith(Command.name, prefix.length))
            yield Command.run(client, message);
    }
    return console.log(`${message.author.tag} just said [${message.content}]`);
});
exports.onMessage = onMessage;
