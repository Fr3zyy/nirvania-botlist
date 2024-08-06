import Link from 'next/link';
import { Eye, ArrowUpRightFromCircle, Tag, Shield } from 'lucide-react';

const BotCard = ({ bot }) => (
    <Link href={`/bots/${bot.id}`} className="block w-full group">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.01] border border-white/10">
            <div className="relative h-24 sm:h-32">
                <img
                    src={bot.profile.banner || "https://cdn.discordapp.com/banners/973946557764349992/12e513cba25fff886b02f92bf2f2cae3.webp?size=1024"}
                    alt={`${bot.profile.username}'s banner`}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
                {bot.verified && (
                    <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-md rounded-full px-2 py-0.5 text-xs font-semibold text-white flex items-center">
                        <Shield size={10} className="mr-1" />
                        Verified
                    </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center">
                    <img
                        src={bot.profile.avatar}
                        alt={`${bot.profile.username}'s avatar`}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                    />
                    <div className="ml-2">
                        <h2 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors duration-300">{bot.profile.username}</h2>
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">#{bot.id.slice(-4)}</span>
                    </div>
                </div>
            </div>
            <div className="p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-zinc-300 mb-2 line-clamp-2 group-hover:text-zinc-200 transition-colors duration-300">{bot.profile.shortDescription}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                    {bot.profile.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-300 flex items-center group-hover:bg-zinc-700/50 group-hover:text-zinc-200 transition-all duration-300">
                            <Tag size={10} className="mr-1" />
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                        <Eye size={14} className="mr-1" />
                        <span className="text-xs sm:text-sm">{bot.stats.views} views</span>
                    </div>
                    <button className="px-3 py-1 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-300 flex items-center group-hover:shadow-md">
                        Invite
                        <ArrowUpRightFromCircle size={12} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    </Link>
);

export default BotCard;