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
        url: "mongodb://localhost:27017/botlist"
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
    }
};

module.exports = config;