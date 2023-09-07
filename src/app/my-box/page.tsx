import Link from 'next/link';
import { NavigationSidebar } from '../components/navigation/navigation-sidebar';
const MyBox = () => {  
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <nav className="flex">
           <h1>My Boxページ</h1>
        </nav>
      </div>
    </div>
  )     
};
export default MyBox;