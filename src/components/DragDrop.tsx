"use client";
import React, { DragEvent, useState, useRef } from "react";
import {
    DocumentBulletListMultiple24Regular,
    Image24Regular,
    Video24Regular,
} from '@fluentui/react-icons';

export default function DragDrop(props: { handleFileChange: (files: any) => void }) {

    const [isDragOver, setIsDragOver] = useState(false); // Ja: ドラッグアンドドロップのState En: Drag-and drop state
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ja: spanタグで input type='file' を表示 En: Span tag to show input type='file'

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);

        // Ja: ドロップされたファイルの処理 En: Handing of dropped files
        const files = Array.from(event.dataTransfer.files);
        // if (files.length > 0) {
        //     props.handleFileChange(files);
        // }
        if (event.dataTransfer.files.length > 0) {
            props.handleFileChange(event.dataTransfer.files);
        }
    };

    const handleFileInputClick = () => {  // Ja: spanをクリックした時 En: When clicked span
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <div className='w-full'>
            <div
                onDragOver={handleDragOver}     // Ja: HTMLでドロップ要素を受け取れるようにする En: HTML to accept drop elements
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}             // Ja: ドロップされた要素に対してのアクション En: Action on dropped elements
                className={`border-2 border-dashed rounded-lg text-center space-y-4 py-8 [&_div]:pointer-events-none ${isDragOver ? 'border-pink01 group is-DragOver [&_path]:fill-pink01 dark:[&_path]:fill-pink01' : 'border-lightItemBorder/20 dark:border-darkItemBorder/20 [&_div]:pointer-events-auto'}`}
            >
                <div className='flex flex-row justify-center -space-x-[20px] h-[65px] 
                                [&_svg]:h-16 [&_svg]:w-16 [&>svg]:relative [&>svg]:z-0'>
                    <Image24Regular className='-rotate-[20deg]
                                            group-[.is-DragOver]:-translate-x-3 group-[.is-DragOver]:-rotate-[25deg]' />
                    <div className='z-10 w-16 relative [&>svg]:absolute [&>svg]:block [&>svg]:bottom-0'>
                        <DocumentBulletListMultiple24Regular className='[&>path]:stroke-white dark:[&>path]:stroke-darkDropDownBg [&>path]:stroke-[1.5px]' />
                        <DocumentBulletListMultiple24Regular className='[&>path]:fill-lightFont dark:[&>path]:fill-white' />
                    </div>
                    <Video24Regular className='rotate-[20deg] group-[.is-DragOver]:translate-x-3 group-[.is-DragOver]:rotate-[25deg]' />
                </div>
                <div className='space-y-3'>
                    <p className='font-bold text-xl'>Drag and Drop Your File</p>
                    <p className='text-sm'>or <span onClick={handleFileInputClick} className='text-pink01 underline underline-offset-2 cursor-pointer'>Select a File</span> from your computer</p>
                </div>
            </div>
            <input className='hidden'
                ref={fileInputRef}
                title="Select the file to upload"
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={(e) => props.handleFileChange(e.target.files)} // Ja: ファイル情報を渡す En: Passing files
            />
        </div>
    );
};