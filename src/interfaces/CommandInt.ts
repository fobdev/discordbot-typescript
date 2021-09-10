import { Client, Message } from "discord.js";

export interface CommandInt {
    name: string;
    description: string;
    run: (client: Client, message: Message) => any;
}
