import { FaHome, FaCompass, FaCode, FaHandshake } from 'react-icons/fa';


const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3001';
    }
    return 'https://botlistapi.nirvania.xyz';
};

const config = {
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
    ]
};

export default config;
