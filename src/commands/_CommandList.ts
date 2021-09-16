import { CommandInt } from "../interfaces/CommandInt";
import { HelloWorld } from "./admin/helloworld";
import { Ping } from "./bot/ping";
import { Help } from "./bot/help";
import { Clear } from "./admin/clear";
import { Kick } from "./admin/kick";
import { RenameServer } from "./admin/renameserver";
import { Ban } from "./admin/ban";
import { Music } from "./music/music";

export const CommandList: CommandInt[] = [
    HelloWorld,
    Ping,
    Help,
    Clear,
    Kick,
    RenameServer,
    Ban,
    Music,
];
