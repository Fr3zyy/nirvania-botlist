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
        url: "mongodb://localhost:27017"
    }
}



module.exports = config;