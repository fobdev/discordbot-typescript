import { Command } from "../../interfaces/Command";

export const HelloWorld: Command = {
    name: ["hello"],
    description: "Triigers a hello world!",
    run: async (prefix, client, message) => {
        const { author, channel, content } = message;
        let text = content.split(" ").slice(1).join(" ");
    },
};
