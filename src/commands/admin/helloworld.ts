import { CommandInt } from "../../interfaces/CommandInt";

export const HelloWorld: CommandInt = {
    name: "hello",
    description: "Triigers a hello world!",
    run: async (client, message) => {
        const { author, channel, content } = message;
        let text = content.split(" ").slice(1).join(" ");
    },
};
