const { config } = require('dotenv')
require('dotenv').config();
const TOKEN = process.env.TOKEN;

const PREFIX = 'la!';

const Discord = require('discord.js');

const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT', 'GUILD_MESSAGE_REACTIONS'] });

client.on('messageCreate', async (msg) => {
    console.log(msg.content);
    if (!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        msg.reply('Pong!')
    }

    if (command === 'membercount') {
        msg.reply(`There are ${msg.guild.memberCount} members in this server!`)
    }

    if (command === 'poll') {
        msg.react('✅');
        msg.react('❎');
    }

    if (command === `kick`) {
        if (!args[0]) return msg.reply("⛔️ You need to mention someone to kick!")
        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("⛔️ You do not have permission to kick members!");
        if (!msg.guild.me.permissions.has("KICK_MEMBERS")) return msg.reply("⛔️ I don't have permission to kick members!");
        if (msg.member.id === member.id) return msg.reply("⛔️ You can't kick yourself!");

        member.kick()
        msg.channel.send(`✅  ${member} was successfully kicked!`)
    }

    if (command === `ban`) {
        if (!args[0]) return msg.reply("⛔️ You need to mention someone to kick!")
        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply("⛔️ You do not have permission to ban members!");
        if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply("⛔️ I do not have permission to ban members!");
        if (msg.member.id === member.id) return msg.reply("⛔️ You can't ban yourself!");

        let reason = args.slice(1).join(" ") || "No reason"

        member.ban({ reason:reason })
        msg.channel.send(`✅  ${member} was successfully banned!\nReason: ${reason}`)
    }
})

const welcomeChannelId = "1031201701664931903"

client.on('guildMemberAdd', (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send(`Welcome <@${member.id}>! Please verify with <@426537812993638400> to unlock the rest of the server. Please read our rules to have our member expectations. If you need any help, reach out to in in the support channel!`)
})

client.login(TOKEN)
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})