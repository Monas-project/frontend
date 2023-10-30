"use client";
import { use, useEffect, useState } from 'react';

const GetBox = () => {
  const [data, setData] = useState<any>(null);
  const getData = () => {
    setData("https://gateway.pinata.cloud/ipfs/QmSCYNg6ciNLkRk8wo3jrhbBzmUjABSh9ek4GDfzGVuPbB?pinataGatewayToken=undefined");
  }

  return (

    <div>
      <div className='h-serchbarHeight' />
      <div className='px-9 py-4'>
        <h1 className='text-folderTitle'>Get Box</h1>

        <div className='flex flex-col'>
          <label className="">URI :</label>
          <textarea className="border border-pink01"></textarea>

          <label className="">Secret Key :</label>
          <textarea className="border border-pink01"></textarea>
        </div>

        <button onClick={getData} className="bg-pink01">Enter</button>
        {data && <div>{data}</div>}
      </div>
    </div>



  )
}
export default GetBox;