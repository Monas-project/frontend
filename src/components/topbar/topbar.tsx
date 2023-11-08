"use client";
import { useEffect, useRef, useState } from "react";
import {
    Search24Regular,
    DismissCircle24Filled,
    ArrowLeft24Regular,
} from "@fluentui/react-icons";
import DarkModeButton from '@/components/darkMode/DarkMode';
import { Searchbar } from "./searchbar";

export const Topbar = () => {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchBarOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isSearchBarOpen]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 640) {
                setIsSearchBarOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleVisibleSearch = () => {
        setIsSearchBarOpen(!isSearchBarOpen)
    };

    return (
        <div className="h-serchbarHeight w-full border-b-1 flex flex-row flex-none divide-x-1 font-light sm:divide-x-0
                        border-lightContentsBorder divide-lightContentsBorder
                        dark:border-darkContentsBorder dark:divide-darkContentsBorder">

            <button type="button" title="open search space for mobile" onClick={handleVisibleSearch} className="relative px-3 z-20 hidden sm:inline-block">
                {isSearchBarOpen ? (
                    <ArrowLeft24Regular />
                ) : (
                    <Search24Regular />
                )}
            </button>

            <div className={`w-full px-8 py-1 bg-lightBg sm:${isSearchBarOpen ? ' pl-10 absolute h-serchbarHeight' : 'hidden'}`}>
                <Searchbar ref={searchRef} />
            </div>

            {/* darkmode button */}
            <div className="aspect-square h-full flex justify-center box-content sm:hidden">
                <DarkModeButton />
            </div>

            {/* Logomark sm */}
            <div className='aspect-square h-full justify-center items-center grow hidden sm:flex'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-7 w-auto fill-pink01' viewBox="0 0 338.9 335.4">
                    <use xlinkHref="/logoMark.svg#logoMark" />
                </svg>
            </div>

            {/* account space */}
            <div className="px-8 pl-20 flex flex-row items-center justify-end space-x-5 sm:px-1 sm:space-x-0">
                <div className="w-3/4 bg-lightSkelton01 dark:bg-darkSkelton01">
                    <span className="block leading-accountNameHeight text-14 truncate sm:hidden">aaaaaaaaaaaaaaaaaaaaaa</span>
                </div>
                <img className="w-10 h-10 rounded-full" src='/accountIconEx.png' alt="icon image" draggable="false" />
            </div>
        </div >
    )
}