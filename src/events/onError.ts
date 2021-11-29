import { Message } from "discord.js";
import { Response } from "../models";

export const onError = (message: Message, error: any) => {
    return message.channel.send({
        embeds: [
            Response(
                `Error: ${error.message}`,
                "The bot was unable to run this command properly.",
                "FAIL"
            ),
        ],
    });
};
