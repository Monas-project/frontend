import { NavigationSidebar } from "../../components/navigation/navigation-sidebar";

const GetBox = () => {
  return (

    <div className="space-y-1rem">
      <h1 className="text-black01 text-heading">Get Box</h1>
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
      <button className="py-2 w-1/5 text-button text-white bg-pink01 rounded hover:bg-pink01Hover transition duration-300 ease-in-out">
        Enter
      </button>
    </div>
  )
}
export default GetBox;