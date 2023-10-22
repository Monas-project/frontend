"use client";
import { useState } from "react";
import {
    Search24Regular,
    DismissCircle24Filled,
} from "@fluentui/react-icons";

export const Searchbar = () => {

    // 入力テキストをstateで管理.クリア.
    const [searchText, setSearchText] = useState("");
    const clearText = () => {
        setSearchText("");
    };

    return (
        <div className="h-serchbarHeight w-full border-b-1 flex flex-row flex-none divide-x-1 font-light
                        bg-lightBg border-lightContentsBorder divide-lightContentsBorder
                        dark:bg-darkBg dark:border-darkContentsBorder dark:divide-darkContentsBorder">
            {/* searchbar space */}
            <div className="w-full px-8 py-1 ">
                <form action="#" aria-label="Search" role="search" className="h-full group" >
                    <label className="h-full px-4 flex items-center justify-center rounded-full border outline-none border-transparent focus-within:border-pink01">
                        <div className=" group-focus-within:text-pink01">
                            <Search24Regular />
                        </div>
                        <div className="h-full w-full px-3" dir="ltr">
                            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search ..." spellCheck="false" enterKeyHint="search" dir="auto"
                                className="normal-case h-full w-full bg-inherit outline-none pt-searchInputPt"
                            />
                        </div>
                        <div>
                            <button type="button" value="clear" title="search clear button" onClick={clearText}
                                className="text-pink01 invisible group-focus-within:visible"><DismissCircle24Filled /></button>
                        </div>
                    </label>
                </form>
            </div >
            
            {/* account space */}
            <div className="px-8 pl-20 flex flex-row items-center justify-end space-x-5">
                <div className="w-3/4 bg-lightSkelton01 dark:bg-darkSkelton01">
                    <span className="block leading-accountNameHeight text-14 truncate">aaaaaaaaaaaaaaaaaaaaaa</span>
                </div>
                <img className="w-10 h-10 rounded-full" src='/accountIconEx.png' alt="icon image" width="40" height="40" draggable="false" />
            </div>
        </div >
    )
}