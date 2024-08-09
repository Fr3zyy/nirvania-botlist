import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, SortAsc, SortDesc } from 'lucide-react';
import config from '../../../../../../config';

const SearchAndCategories = ({ onSearch, onCategorySelect, onSortChange, selectedCategory, sortOption, sortOrder }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllCategories, setShowAllCategories] = useState(false);
    const categories = config.botTags;
    const initialVisibleCategories = 5;

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const toggleShowAllCategories = () => {
        setShowAllCategories(!showAllCategories);
    };

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    const visibleCategories = showAllCategories ? categories : categories.slice(0, initialVisibleCategories);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <form onSubmit={handleSearchSubmit} className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search for the top bots in Discord..."
                        className="w-full border-2 border-white/5 py-3 pl-4 pr-12 bg-zinc-800/50 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-white/5 p-2 rounded-lg">
                        <Search className="text-white" size={20} />
                    </button>
                </form>
                <div className="relative">
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="appearance-none border-2 border-white/5 bg-zinc-800/50 backdrop-blur-sm text-white py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="createdAt">Date Added</option>
                        <option value="stats.votes">Votes</option>
                    </select>
                    {sortOrder === 'asc' ? (
                        <SortAsc className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
                    ) : (
                        <SortDesc className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
                    )}
                </div>
            </div>
            <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {visibleCategories.map((category, index) => (
                        <motion.button
                            key={category}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            layout
                            className={`px-3 py-1 text-sm backdrop-blur-sm text-white rounded-md border-2 border-white/5 transition-colors duration-300 ${
                                selectedCategory === category ? 'border-white/20' : 'bg-zinc-800/50 hover:bg-zinc-900'
                            }`}
                            onClick={() => onCategorySelect(category === selectedCategory ? '' : category)}
                        >
                            # {category}
                        </motion.button>
                    ))}
                </AnimatePresence>
                {categories.length > initialVisibleCategories && (
                    <motion.button
                        layout
                        className="px-3 py-1 text-sm backdrop-blur-sm text-white rounded-md border-2 border-white/5 transition-colors duration-300 bg-zinc-800/50 hover:bg-pink-500 flex items-center"
                        onClick={toggleShowAllCategories}
                    >
                        {showAllCategories ? (
                            <>
                                Show Less <ChevronUp className="ml-1" size={16} />
                            </>
                        ) : (
                            <>
                                More <ChevronDown className="ml-1" size={16} />
                            </>
                        )}
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};

export default SearchAndCategories;