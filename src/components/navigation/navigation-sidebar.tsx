"use client";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
    Box24Regular,
    BoxCheckmark24Regular,
    BoxSearch24Regular,
    PeopleCommunity24Regular,
    Box24Filled,
    BoxCheckmark24Filled,
    BoxSearch24Filled,
    PeopleCommunity24Filled,
} from "@fluentui/react-icons";

// interface NavigationSidebarProps {
//     resetMyBox: () => void;
//   }

export const NavigationSidebar = () => {
    const router = useRouter();
    // const refreshMybox = () => {
    //     router.refresh()
    // }

    const searchParams = useSearchParams()
    const cid = searchParams.get('cid');

    const pathname = usePathname();

    const navContents = [
        { name: 'My Box', href: '/my-box', iconA: Box24Filled, iconB: Box24Regular },
        { name: 'Shared Box', href: '/shared-box', iconA: BoxCheckmark24Filled, iconB: BoxCheckmark24Regular },
        { name: 'Get Box', href: '/get-box', iconA: BoxSearch24Filled, iconB: BoxSearch24Regular },
        { name: 'Friend List', href: '/friend-list', iconA: PeopleCommunity24Filled, iconB: PeopleCommunity24Regular },
    ];

    return (
        <div className='h-full w-sideberWidth flex flex-col flex-none justify-center space-y-4 px-2.5 border-r-1 sticky top-0
                        border-lightContentsBorder
                        dark:border-darkContentsBorder'>
            <div className='absolute top-7 left-7'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-navLogoType w-auto fill-pink01' viewBox="0 0 893.9 236.87">
                    <use xlinkHref="/logoType.svg#logoType" />
                </svg>
            </div>
            <div className='absolute bottom-40 left-auto right-1/2'>
            </div>

            {navContents.map((item) => (
                <div key={item.name}
                    className={`relative flex rounded items-center border space-x-5 text-14
                                border-lightItemBorder border-opacity-0 bg-darkBg bg-opacity-0
                                dark:border-darkItemBorder dark:border-opacity-0 dark:bg-lightBg dark:bg-opacity-0
                                
                        ${pathname === item.href ?
                        'border-opacity-100 bg-opacity-5 hover:bg-opacity-10 dark:border-opacity-100 dark:bg-opacity-10 dark:hover:bg-opacity-20 ' :
                        'hover:bg-opacity-5 dark:hover:bg-opacity-5'}`}
                >

                    <div className='flex flex-none items-center justify-center mx-5 my-2.5'>
                        {pathname === item.href ? <item.iconA aria-hidden='true' /> : <item.iconB aria-hidden='true' />}
                    </div>
                    <div className='flex items-center'>
                        <Link href={item.href}>
                            {item.name}
                            <span className='absolute inset-0'></span>
                        </Link>
                    </div>

                </div>
            ))}
        </div>
    )
}