import { NavigationSidebar } from '../../components/navigation/navigation-sidebar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='h-screen overflow-hidden flex flex-col bg-pink02 text-black01 font-SegoeUI font-semilight'>
            <div className='grid h-full'
                style={{
                    gridTemplateAreas: `
                            "b a a a a a"
                            "b c c c c c"
                            "b c c c c c"`,
                    gridTemplateRows: "1fr 5fr 5fr",
                    gridTemplateColumns: "1fr 5fr"
                }}>
                <div className='bg-pink02' style={{ gridArea: 'b' }}>
                    <NavigationSidebar />
                </div>
                <div className='bg-pink02 flex items-center justify-center' style={{ gridArea: 'a' }}>
                    <div className='bg-pink03 w-4/5 h-4/5 rounded-full'></div>
                </div>
                <div className='bg-white m-1.25rem rounded p-1rem space-y-1rem' style={{ gridArea: 'c' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}