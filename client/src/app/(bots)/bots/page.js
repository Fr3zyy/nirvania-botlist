"use client"
import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Square from '@/components/Background/Square';
import BotCard from './components/Card/BotCard';

const Bots = () => {
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBots = async () => {
            try {
                const response = await fetch('http://localhost:3001/bots');
                const data = await response.json();
                setBots(data.bots);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bots:', error);
                setLoading(false);
            }
        };

        fetchBots();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <Square column="6" row="6" zIndex={0} transparentEffectDirection="leftRightBottomTop" blockColor="#808080" />

            {loading ? (
                <Loader />
            ) : (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-zinc-100 mb-8">Discord Bots</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {bots.map((bot) => (
                            <div key={bot.id} className="w-full max-w-xl mx-auto">
                                <BotCard bot={bot} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bots;