"use client";
import { NavigationSidebar } from "../../components/navigation/navigation-sidebar";
import { use, useEffect, useState } from 'react';

const GetBox = () => {
  const [data, setData] = useState<any>(null);
  const getData = () => {
    setData("https://gateway.pinata.cloud/ipfs/QmSCYNg6ciNLkRk8wo3jrhbBzmUjABSh9ek4GDfzGVuPbB?pinataGatewayToken=undefined");
  }

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
        </div>
        <div className='bg-white m-1.25rem rounded p-1rem space-y-1rem' style={{ gridArea: 'c' }}>
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
          <button className="py-2 w-1/5 text-button text-white bg-pink01 rounded hover:bg-pink01Hover transition duration-300 ease-in-out" onClick={getData}>
            Enter
          </button>
          {data && <div>{data}</div>}
        </div>
      </div>
    </div>
  )
}
export default GetBox;