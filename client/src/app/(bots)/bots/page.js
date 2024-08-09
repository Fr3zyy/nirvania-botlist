"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import BotCard from './components/Card/BotCard';
import Pagination from '@/components/Pagination';
import SearchAndCategories from './components/SearchAndCategories';
import Square from '@/components/Background/Square';
import config from '../../../../config';

const Bots = () => {
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchBots = async (page, search, category, sort, order) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                limit: 20,
                search: search,
                tag: category,
                sort: sort,
                order: order
            }).toString();
            const response = await fetch(`${config.api}/bots?${queryParams}`);
            const data = await response.json();
            setBots(data.bots);
            setTotalPages(data.pagination.pages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bots:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBots(currentPage, searchTerm, selectedCategory, sortOption, sortOrder);
    }, [currentPage, searchTerm, selectedCategory, sortOption, sortOrder]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSortChange = (option) => {
        if (option === sortOption) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOption(option);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.div 
            className="p-4 sm:p-6 md:p-8"
        >
            <Square column="6" row="6" zIndex={0} transparentEffectDirection="leftRightBottomTop" blockColor="#808080" />
            <div className="max-w-7xl mx-auto">
                <SearchAndCategories 
                    onSearch={handleSearch} 
                    onCategorySelect={handleCategorySelect}
                    onSortChange={handleSortChange}
                    selectedCategory={selectedCategory}
                    sortOption={sortOption}
                    sortOrder={sortOrder}
                />
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Loader />
                        </motion.div>
                    ) : bots.length > 0 ? (
                        <motion.div
                            key="content"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                                {bots.map((bot) => (
                                    <motion.div key={bot.id} variants={itemVariants}>
                                        <BotCard bot={bot} />
                                    </motion.div>
                                ))}
                            </motion.div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-bots"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-8"
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">No bots found</h2>
                            <p className="text-zinc-400">
                                {searchTerm 
                                    ? `No bots match your search "${searchTerm}"`
                                    : selectedCategory
                                    ? `No bots found in the "${selectedCategory}" category`
                                    : "There are no bots available at the moment"}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Bots;