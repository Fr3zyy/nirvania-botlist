const config = {
    bot: {
        token: "",
        prefix: ""
    },
    auth: {
        clientId: "",
        clientSecret: "",
        callbackUrl: "http://localhost:3001/auth/callback",
        scopes: ["identify"]
    },
    database: {
        url: "mongodb://localhost:27017/server"
    },
    server: {
        id: "",
        roles: {
            owner: "",
            botReviewer: ""
        },
        channels: {
            login: "",
            botLogs: "",
            votes: ""
        }
    },
    website: {
        frontEnd: ["http://localhost:3000"],
        botTags: [
            "Fun", "NSFW", "Game", "24/7", "OSU!", "Guard", "Anime", "Music",
            "Memes", "Invite", "Reddit", "Twitch", "Crypto", "Economy",
            "Logging", "Youtube", "Utility", "General", "Leveling", "Roleplay",
            "Fortnite", "Welcomer", "Chat bot", "Minecraft", "Community",
            "Minigames", "Moderation", "Protection", "Web Dashboard",
            "Reaction Roles", "Auto Moderation"
        ],
        languages: [
            { flag: 'tr', code: 'tr', name: 'Türkce' },
            { flag: 'gb', code: 'en', name: 'English' },
            { flag: 'de', code: 'de', name: 'Deutsch' },
            { flag: 'ru', code: 'ru', name: 'Russian' },
            { flag: 'fr', code: 'fr', name: 'French' },
            { flag: 'es', code: 'es', name: 'Spanish' },
            { flag: 'gr', code: 'el', name: 'Greek' }
        ]
    }
};

module.exports = config;