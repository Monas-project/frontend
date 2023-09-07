import { NavigationSidebar } from "../components/navigation/navigation-sidebar";

const SharedBox = () => {
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <nav className="flex">
           <h1>Shared Boxページ</h1>
        </nav>
      </div>
    </div>
  )     
}
export default SharedBox;