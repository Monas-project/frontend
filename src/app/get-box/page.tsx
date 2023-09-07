import { NavigationSidebar } from "../components/navigation/navigation-sidebar";

const GetBox = () => {
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <nav className="flex">
           <h1>Get Boxページ</h1>
        </nav>
      </div>
    </div>
  )     
}
export default GetBox;