import { CommandInt } from "../../interfaces/CommandInt";
import ytdl from "ytdl-core";
import { MessageEmbed } from "discord.js";
import {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} from "@discordjs/voice";

export const Music: CommandInt = {
    name: "music",
    description: "Play music!",
    run: async (client, message) => {
        // parse youtube URL
        let { author, content, channel, member, guild } = message;

        if (channel.type == "DM") return;
        let argument = content.split(" ").slice(1).join("");

        let arglist = ["leave"];

        // checks if the youtube link is valid
        const ytb_regex =
            /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

        if (
            !argument.match(ytb_regex) &&
            argument != arglist.find((element) => element === argument)
        ) {
            return channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Error with the link!")
                        .setDescription("Please use a valid YouTube link.")
                        .setColor("RED"),
                ],
            });
        } else {
            let vc = joinVoiceChannel({
                channelId: member?.voice.channel?.id!,
                guildId: message.guild!.id,
                adapterCreator: message.guild?.voiceAdapterCreator!,
            });

            if (argument === "leave") vc.destroy();
            else {
                const player = createAudioPlayer();
                const resource = createAudioResource(ytdl(argument));
                player.play(resource);

                vc.subscribe(player);
            }
        }
    },
};
