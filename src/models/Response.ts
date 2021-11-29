import { ColorResolvable, MessageEmbed } from "discord.js";

export const Response = (
    title: string,
    description: string,
    type: "SUCCESS" | "FAIL" | "WARN" | "OTHER",
    other: ColorResolvable = "WHITE"
) => {
    /**
     * 3 main colors for a padronized response
     * in the case of OTHER, necessary filling the @param other
     * otherwhise, the setting will be white.
     */

    let color: ColorResolvable = other;
    switch (type) {
        case "SUCCESS":
            color = "GREEN";
            break;
        case "FAIL":
            color = "RED";
            break;
        case "WARN":
            color = "ORANGE";
        default:
            break;
    }

    return new MessageEmbed().setTitle(title).setDescription(description).setColor(color);
};
