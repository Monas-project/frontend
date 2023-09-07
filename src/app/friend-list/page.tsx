import { NavigationSidebar } from "../components/navigation/navigation-sidebar";

const FriendList = () => {
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <nav className="flex">
           <h1>Friend Listページ</h1>
        </nav>
      </div>
    </div>
  )     
}
export default FriendList;