"use client";
import React, { useState, useEffect, useRef } from "react";

function ResizeText({ children }) {
    const parentRef = useRef(null); // Ja: 親要素へのref En: ref to parent element

    const [fontSize, setFontSize] = useState(17); // Ja: 初期フォントサイズ En: Initial font size

    // Ja: ウィンドウサイズが変更されたら、フォントサイズを調整
    // En: Adjust font size when Windows size changes
    useEffect(() => {
        const handleResize = () => {
            const parentWidth = parentRef.current.offsetWidth; // refを使用して親の幅を取得
            const parentHeight = parentRef.current.offsetHeight; // refを使用して親の高さを取得
            const newFontSize = Math.min((parentWidth / 100) * 1.67, (parentHeight / 100) * 1.67 ); // 100%に対して1.67%のフォントサイズに変換
            setFontSize(newFontSize);
        };

        // Ja: ウィンドウサイズの変更を監視
        // En: Monitor Windows size changes
        window.addEventListener('resize', handleResize);

        // Ja:初回の計算
        // En:Initial calculation
        handleResize();

        // Ja:クリーンアップ
        // En: Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={parentRef} style={{ width: '100%', height: '100%' }}>
            <div style={{ fontSize: `${fontSize}px` }}>
                {children}
            </div>
        </div>
    );
}

export default ResizeText; 
