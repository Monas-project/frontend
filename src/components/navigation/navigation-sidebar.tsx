"use client";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
    Box24Regular,
    BoxCheckmark24Regular,
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
        { name: 'My Box', href: '/my-box', icon: Box24Regular },
        { name: 'Shared Box', href: '/shared-box', icon: BoxCheckmark24Regular },
        { name: 'Get Box', href: '/get-box', icon: BoxSearch24Filled },
        { name: 'Friend List', href: '/friend-list', icon: PeopleCommunity24Filled },
    ];

    const maskStyle = {
        WebkitMaskImage: `url('/monasLogo.png')`,
        maskImage: `url('/monasLogo.png')`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
        backgroundColor: '#FF4185',
    };

    return (
        <div className="h-full">
            <div className='h-full flex flex-col justify-center bg-pink03 rounded-r-xl text-black01 font-SegoeUI font-normal space-y-1.25rem relative'>

                <div className="w-23% aspect-[336/340] absolute top-11.5% m-auto left-0 right-0">
                    <div
                        className="w-full h-full"
                        style={maskStyle}
                    />
                </div>

                {navContents.map((item) => (
                    <div key={item.name}
                        className={`relative flex space-x-1.25rem py-0.5rem ml-1rem rounded-l-full items-center pl-1.25rem
                        ${pathname === item.href ? 'bg-pink02 text-pink01' : 'hover:text-pink01'}`}>

                        <div className='flex flex-none items-center justify-center'>
                            <item.icon className='h-1rem w-r1em' aria-hidden='true' />
                        </div>

                        <div className='flex items-center'>
                            <Link href={item.href}
                            >
                                {item.name}
                                <span className='absolute inset-0'></span>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}