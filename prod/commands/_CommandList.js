"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = void 0;
const helloworld_1 = require("./admin/helloworld");
const ping_1 = require("./bot/ping");
const help_1 = require("./bot/help");
const clear_1 = require("./admin/clear");
const kick_1 = require("./admin/kick");
const renameserver_1 = require("./admin/renameserver");
const ban_1 = require("./admin/ban");
const music_1 = require("./music/music");
exports.CommandList = [
    helloworld_1.HelloWorld,
    ping_1.Ping,
    help_1.Help,
    clear_1.Clear,
    kick_1.Kick,
    renameserver_1.RenameServer,
    ban_1.Ban,
    music_1.Music,
];
