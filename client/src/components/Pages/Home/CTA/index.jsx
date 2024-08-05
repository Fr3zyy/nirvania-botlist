import React from 'react';
import { FaDiscord } from 'react-icons/fa';

const CTA = () => {
    return (
        <div className="relative bg-zinc-900/20 text-white py-12 px-6 overflow-hidden mx-auto max-w-4xl rounded-lg shadow-2xl">
            <div className="max-w-xl mx-auto text-center relative z-10">
                <h2 className="text-xl font-bold mb-3">Botunuzu eklemek ister misiniz?</h2>
                <p className="text-gray-400 text-sm mb-5">Botunuzu listemize ekleyebilirsiniz, aşağıdaki butona tıklamanız yeterli.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center mx-auto group">
                    <FaDiscord className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Discord ile giriş yap
                </button>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5">
                <div className="grid grid-cols-3 gap-x-6 gap-y-4 -mr-2 rotate-12">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-md transform rotate-12 transition-transform hover:rotate-0 duration-300"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CTA;