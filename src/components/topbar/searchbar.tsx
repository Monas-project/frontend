"use client";
import { useEffect, useRef, useState } from "react";
import {
    Search24Regular,
    DismissCircle24Filled,
    ArrowLeft24Regular,
} from "@fluentui/react-icons";

export const Searchbar = () => {

    // Ja:入力テキストをstateで管理.クリア.
    // En: Manage input text in state
    const [searchText, setSearchText] = useState("");
    const clearText = () => {
        setSearchText("");
    };

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isSearchBarOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isSearchBarOpen]);

    return (
        <form action="#" aria-label="Search" role="search" className="h-full group" >
            <label className="h-full px-4 flex items-center justify-center rounded-full border outline-none border-transparent focus-within:border-pink01">
                <button
                    type="button"
                    title="open search space for mobile"
                    className=" group-focus-within:text-pink01">
                    <Search24Regular />
                </button>
                
                <div className="h-full w-full px-3" dir="ltr">
                    <input
                    ref={searchRef}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search ..."
                    spellCheck="false"
                    enterKeyHint="search"
                    dir="auto"
                    className="normal-case h-full w-full bg-inherit outline-none pt-searchInputPt" />
                </div>
                <div>
                    <button type="button" value="clear" title="clear search text" onClick={clearText}
                        className="text-pink01 invisible group-focus-within:visible"><DismissCircle24Filled /></button>
                </div>
            </label>
        </form>
    )
}