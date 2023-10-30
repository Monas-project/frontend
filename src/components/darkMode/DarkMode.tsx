"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

import Lottie from "lottie-react"
import ToLightAnimation from "./toLight.json";
import ToDarkAnimation from "./toDark.json";

const style = {
    height: 30,
    weight: 30,
};

const DarkModeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const [isPlaying, setIsPlaying] = useState(false);
    const lottieRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {

        if (theme === "dark") {
            document.documentElement.style.background = "#fff"; // ライトモードのbg
            setIsPlaying(true);
            setTheme("light");

        } else {
            document.documentElement.style.background = "#0f0f0f"; // ダークモードのbg
            setIsPlaying(true);
            setTheme("dark");
        }
    };

    const onAnimationComplete = () => {
        setIsPlaying(false);
    };

    if (!mounted) {
        return null;
    };

    return (
        <button
            title="change theme"
            className="w-full h-full flex justify-center items-center"
            onClick={handleThemeToggle}>
            {isPlaying ? (
                <Lottie className=""
                    animationData={theme === "dark" ? ToDarkAnimation : ToLightAnimation}
                    loop={false}
                    onComplete={onAnimationComplete}
                    lottieRef={lottieRef}
                    autoplay={isPlaying}
                    style={style}
                />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox=" 0 0 230 230">
                    <use href={theme === 'dark' ? "/darkModeMoon.svg#darkModeMoon" : "/lightModeSun.svg#lightModeSun"} />
                </svg>
            )}
        </button>
    );
};

export default DarkModeButton; 