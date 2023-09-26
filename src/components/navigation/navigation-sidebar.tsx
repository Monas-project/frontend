"use client";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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
    return (
        <div className="h-full">
            <aside className="flex h-full w-56 flex-col space-y-2 border-r-2 border-gray-200 bg-gray p-2" x-show="asideOpen">
                <Link href="/my-box" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span className="text-2xl"><i className="bx bx-home"></i></span>
                    <span>My Box</span>
                </Link>

                <Link href="/shared-box" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span className="text-2xl"><i className="bx bx-cart"></i></span>
                    <span>Shared Box</span>
                </Link>

                <Link href="/get-box" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span className="text-2xl"><i className="bx bx-shopping-bag"></i></span>
                    <span>Get Box</span>
                </Link>

                <Link href="/friend-list" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                    <span className="text-2xl"><i className="bx bx-heart"></i></span>
                    <span>Friend List</span>
                </Link>
            </aside>
        </div>
    )
}