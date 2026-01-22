const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const PREFIX = ",";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply("You don’t have permission to use this.");
  }

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "timeout") {
    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    const duration = 5 * 60 * 1000; // 5 minutes
    await member.timeout(duration, "Inappropriate language");

    message.reply(`${member.user.tag} has been timed out for 5 minutes.`);
  }
});

client.login(config.token);