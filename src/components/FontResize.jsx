"use client";
import React, { useState, useEffect, useRef } from "react";

function ResizeText({ children }) {
    const parentRef = useRef(null); // 親要素へのref

    const [fontSize, setFontSize] = useState(17); // 初期フォントサイズ

    // ウィンドウサイズが変更されたら、フォントサイズを調整
    useEffect(() => {
        const handleResize = () => {
            const parentWidth = parentRef.current.offsetWidth; // refを使用して親の幅を取得
            const parentHeight = parentRef.current.offsetHeight; // refを使用して親の高さを取得
            const newFontSize = Math.min((parentWidth / 100) * 1.67, (parentHeight / 100) * 1.67 ); // 100%に対して1.67%のフォントサイズに変換
            setFontSize(newFontSize);
        };

        // ウィンドウサイズの変更を監視
        window.addEventListener('resize', handleResize);

        // 初回の計算
        handleResize();

        // クリーンアップ
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
