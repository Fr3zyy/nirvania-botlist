"use client"
import React from 'react';
import Square from './Background/Square';

export default function LayoutWrapper({ children }) {
    return (
        <>
            <Square
                column={6}
                row={6}
                transparentEffectDirection="leftRightBottomTop"
                blockColor="#808080"
                zIndex={0}
            />
            {children}
        </>
    );
}