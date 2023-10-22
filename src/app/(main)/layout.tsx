import { NavigationSidebar } from '../../components/navigation/navigation-sidebar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='h-screen w-screen font-semilight'>

            <div className='h-full flex flex-row'>
                <NavigationSidebar />
                {children}
            </div>
        </div>
    );
}