"use client";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { useState } from 'react';
// import { useData, DataProvider } from "@/context/metaData";

const Folder = (props: any) => {
  console.log(props);
  const router = useRouter();
  const searchParams = useSearchParams()
  const root = {
    "name": "Root",
    "owner": "0x123...576",
    "creation_date": "",
    "location": "",
    "parent": { "name": "", "location": "" },
    "child": [
      { "name": "AAAAAAAAAAAAAAAAFile1", "isFile": true, "creation_date": "2023-09-09", "location": "file1.location" },
      { "name": "File2", "isFile": true, "creation_date": "2023-10-09", "location": "file2.location" },
      { "name": "Folder1", "isFile": false, "creation_date": "2009-09-09", "location": "folder2.location" },
      { "name": "Folder2", "isFile": false, "creation_date": "2002-01-04", "location": "folder2.location" },
    ]
  };
  // const getRoot = () => {
  //   // get root関数
  // }
  // const getDateList = () => {
  //   setDateList(root.child)
  // }

  // const [date, setDate] = useState(root.child)
  const [date, setDate] = useState(root);
  const [dataList, setDataList] = useState(root.child);
  const [owner, setOwner] = useState("0x253...354");

  // / My Boxを初期状態にリセットする関数
  //   const resetMyBox = () => {
  //     // 初期データまたはAPIからデータを再取得して、setDataListでセットする
  //     setDataList(root.child);
  //   }

  const getDate = (testFolderId: string) => {

    const folderId = "38745683465";

    router.push(`/my-box/${folderId}`);
  }


  const handleDelete = (location: string) => {
    // delete処理
  }

  const handleDownload = (location: string) => {
    // download処理
  }


  // const dataList = [
  //   {
  //     "name": "Folder1",
  //     "creation_date": "2023-09-09",
  //     "location": "folder1_uri",
  //     "parent": { "name": "parent.name", "location": "parent.location" },
  //     "child": [
  //         { "name": "File1", "isFile": true, "location": "file1.location" },
  //         { "name": "File2", "isFile": true, "location": "file2.location" },
  //         { "name": "Folder2", "isFile": false, "location": "folder2.location" }
  //     ]
  //   },
  //   {
  //     "name": "Folder2",
  //     "creation_date": "2023-09-09",
  //     "location": "folder1_uri",
  //     "parent": { "name": "parent.name", "location": "parent.location" },
  //     "child": [
  //         { "name": "File1", "isFile": true, "location": "file1.location" },
  //         { "name": "File2", "isFile": true, "location": "file2.location" },
  //         { "name": "Folder2", "isFile": false, "location": "folder2.location" }
  //     ]
  //   }
  // ];

  // useEffect(() => {
  //   // フォルダとファイルのデータをAPIから取得し、setDataListでセットする
  // }, []);
  return (
    // <DataProvider>
    <div className="space-y-1rem">

      <div className="text-heading flex">
        <a href='../my-box' className='text-gray02 hover:bg-pink03'>Own Space</a>
        <span className='mx-0.5rem flex items-center justify-center '>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#757575" d="M8.47 4.22a.75.75 0 0 0 0 1.06L15.19 12l-6.72 6.72a.75.75 0 1 0 1.06 1.06l7.25-7.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0Z" /></svg>
        </span>
        <span>Folder1</span>
      </div>

      <div className='w-full flex flex-row justify-between items-center font-normal'>
        <div className='flex flex-row space-x-0.5rem'>
          <div className='flex border rounded-md items-center h-2.5rem'>
            <span className='w-0.5rem'></span>
            <label className='pl-2rem pr-1rem'>Type</label>
            <span className='w-1.25rem h-1.25rem mr-2rem'>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z"></path>
              </svg>
            </span>
          </div>
          <div className='flex border rounded-md items-center h-2.5rem'>
            <span className='w-0.5rem'></span>
            <label className='pl-2rem pr-1rem'>People</label>
            <span className='w-1.25rem h-1.25rem mr-2rem'>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z"></path>
              </svg>
            </span>
          </div>
          <div className='flex border rounded-md items-center h-2.5rem'>
            <span className='w-0.5rem'></span>
            <label className='pl-2rem pr-1rem'>Modified</label>
            <span className='w-1.25rem h-1.25rem mr-2rem'>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className='flex flex-row-reverse space-x-4%'>
          <button className="flex border rounded-md items-center h-4rem whitespace-nowrap ml-0.5rem"

          >
            <span className='w-1.25rem h-1.25rem ml-2rem'>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill='#FF4185' d="M3.5 6.25V8h4.629a.75.75 0 0 0 .53-.22l1.53-1.53l-1.53-1.53a.75.75 0 0 0-.53-.22H5.25A1.75 1.75 0 0 0 3.5 6.25Zm-1.5 0A3.25 3.25 0 0 1 5.25 3h2.879a2.25 2.25 0 0 1 1.59.659L11.562 5.5h7.189A3.25 3.25 0 0 1 22 8.75v4.06a6.518 6.518 0 0 0-1.5-1.078V8.75A1.75 1.75 0 0 0 18.75 7h-7.19L9.72 8.841a2.25 2.25 0 0 1-1.591.659H3.5v8.25c0 .966.784 1.75 1.75 1.75h6.063c.173.534.412 1.037.709 1.5H5.25A3.25 3.25 0 0 1 2 17.75V6.25ZM23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0Zm-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1H18Z" />
              </svg>
            </span>
            <p className='pl-1rem pr-2rem'>Create Folder</p>
            <span className='w-0.5rem'></span>
          </button>

          <button className="flex border rounded-md items-center h-4rem whitespace-nowrap"

          >

            <span className='w-1.25rem h-1.25rem ml-2rem'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                <path fill='#FF4185' d="M6 2a2 2 0 0 0-2 2v5.207a5.48 5.48 0 0 1 1-.185V4a1 1 0 0 1 1-1h4v3.5A1.5 1.5 0 0 0 11.5 8H15v8a1 1 0 0 1-1 1h-3.6a5.507 5.507 0 0 1-.657 1H14a2 2 0 0 0 2-2V7.414a1.5 1.5 0 0 0-.44-1.06l-3.914-3.915A1.5 1.5 0 0 0 10.586 2H6Zm8.793 5H11.5a.5.5 0 0 1-.5-.5V3.207L14.793 7ZM5.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9Zm2.354-4.854a.5.5 0 1 1-.708.708L6 13.707V16.5a.5.5 0 0 1-1 0v-2.793l-1.146 1.147a.5.5 0 1 1-.708-.707l2-2A.5.5 0 0 1 5.497 12h.006a.498.498 0 0 1 .348.144l.003.003l2 2Z" />
              </svg>
            </span>
            <p className='pl-1rem pr-2rem'>Upload File</p>
            <span className='w-0.5rem'></span>
          </button>

        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className='border-b border-gray01'>
            <th className="w-4.5% p-0.5rem font-normal">Name</th>
            <th className="w-49% font-normal"></th>
            <th className="w-11.5% font-normal">Owner</th>
            <th className="w-20% font-normal">Data Info</th>
            <th className="w-15% font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr key={index}>
              <td className="p-0.5rem border-b border-gray01">
                {item.isFile ? (
                  <Image src="/document-24-filled.svg" alt="file" width={25} height={25} />
                ) : (
                  <Image src="/folder-24-filled.svg" alt="folder" width={25} height={25} onClick={() => getDate(item.location)} />
                )}
              </td>
              {item.isFile ? (
                <td className="border-b border-gray01">{item.name}</td>
              ) : (
                <td className="border-b border-gray01" onClick={() => getDate(item.location)}>{item.name}</td>
              )}
              <td className="border-b border-gray01">{date.owner}</td>
              <td className="border-b border-gray01">{item.creation_date}</td>
              <td className="py-0.5rem border-b border-gray01 space-x-1rem">
                {item.isFile ? (
                  <>
                    <Image
                      src="/arrow-download-24-regular.svg"
                      alt="Download"
                      width={20}
                      height={20}
                      onClick={() => handleDownload(item.location)}
                      className='inline-block'
                    />
                    <Image
                      src="/share-24-regular.svg"
                      alt="Share"
                      width={20}
                      height={20}
                      className='inline-block'
                    />
                    <Image
                      src="/delete-24-regular.svg"
                      alt="Delete"
                      width={20}
                      height={20}
                      onClick={() => handleDelete(item.location)}
                      className='inline-block'
                    />
                    <Image
                      src="/key-24-regular.svg"
                      alt="re-encryt"
                      width={20}
                      height={20}
                      className='inline-block'
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src="/arrow-download-24-regular.svg"
                      alt="Download"
                      width={20}
                      height={20}
                      onClick={() => handleDownload(item.location)}
                      className='inline-block'
                    />
                    <Image
                      src="/share-24-regular.svg"
                      alt="Share"
                      width={20}
                      height={20}
                      className='inline-block'
                    />
                    <Image
                      src="/delete-24-regular.svg"
                      alt="Delete"
                      width={20}
                      height={20}
                      onClick={() => handleDelete(item.location)}
                      className='inline-block'
                    />
                    <Image
                      src="/key-24-regular.svg"
                      alt="re-encryt"
                      width={20}
                      height={20}
                      className='inline-block'
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // </DataProvider>
  )
};
export default Folder;
