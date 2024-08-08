"use client"
import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Square from '@/components/Background/Square';
import BotCard from './components/Card/BotCard';
import Pagination from '@/components/Pagination';

const Bots = () => {
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBots = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/bots?page=${page}&limit=10`);
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
        fetchBots(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <Square column="6" row="6" zIndex={0} transparentEffectDirection="leftRightBottomTop" blockColor="#808080" />

            {loading ? (
                <Loader />
            ) : (
                <div className="max-w-7xl mx-auto mb-24">
                    <h1 className="text-3xl font-bold text-zinc-100 mb-8">Discord Bots</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {bots.map((bot) => (
                            <div key={bot.id} className="w-full max-w-xl mx-auto">
                                <BotCard bot={bot} />
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Bots;