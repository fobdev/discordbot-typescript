import { CommandInt } from "../../interfaces/CommandInt";

export const Ping: CommandInt = {
    name: "ping",
    description: "Displays the ping of the client.",
    run: async (client, message) => {
        message.channel.send(`Client ping: ${client.ws.ping}ms`);
    }
}