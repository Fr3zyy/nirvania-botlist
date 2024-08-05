import { FaHome, FaCompass, FaCode, FaHandshake } from 'react-icons/fa';


const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3001';
    }
    return 'https://botlistapi.nirvania.xyz';
};

const config = {
    siteConfig: {
        name: "Nirvania",
        description: "Discover the ultimate Discord bot list, featuring a wide range of bots to enhance your server experience. Explore, compare, and find the perfect bot today!"
    },
    api: getApiUrl(),
    navItems: [
        { icon: FaHome, label: 'Ana Sayfa', target: '/' },
        { icon: FaCompass, label: 'Keşfet', target: '/discover' },
    ],
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
    ],
    errorMessages: {
        400: 'Invalid request. Please verify your input.',
        401: 'Access denied. Please log in to continue.',
        403: 'Access restricted. You lack the necessary permissions.',
        404: 'Page not found. The resource does not exist.',
        500: 'Server error. Please try again later.',
        503: 'Service unavailable. We are currently working on resolving the issue.'
    }
};

export default config;

