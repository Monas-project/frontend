import { NavigationSidebar } from "../../components/navigation/navigation-sidebar";

const GetBox = () => {
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar resetMyBox={() => {}} />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center">Get Box</h1>
        <div>
          <label className="block text-white-700 text-sm mb-2">
            URI :
          </label>
          <textarea className="mt-1 block text-gray-700 w-full border border-gray-700 rounded"></textarea>
          <label className="block text-white-700 text-sm mb-2">
            Secret Key :
          </label>
          <textarea className="mt-1 block text-gray-700 w-full border border-gray-700 rounded"></textarea>
        </div> 
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Enter
        </button>
      </div>
      
    </div>
  )     
}
export default GetBox;