import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [inputPage, setInputPage] = useState('');

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const showEllipsis = totalPages > 5;

        if (showEllipsis) {
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                pageNumbers.push(currentPage);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 1 && Number(value) <= totalPages)) {
            setInputPage(value);
        }
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && inputPage !== '') {
            onPageChange(Number(inputPage));
            setInputPage('');
        }
    };

    return (
        <div className="flex items-center justify-center space-x-1 mt-4 p-2 rounded-lg">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded-md bg-zinc-900/20 border-2 border-white/5 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} />
            </button>
            {renderPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <input
                            type="text"
                            value={inputPage}
                            onChange={handleInputChange}
                            onKeyPress={handleInputKeyPress}
                            className="w-8 h-8 text-center bg-zinc-900/20 text-gray-300 border-2 border-white/5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="..."
                        />
                    ) : (
                        <button
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded-md border-2 text-sm ${currentPage === page
                                    ? 'border-white/30 text-white'
                                    : 'border-white/5 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md bg-zinc-900/20 border-2 border-white/5 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;