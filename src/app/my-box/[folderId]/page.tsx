"use client";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { useState } from 'react';
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
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
        { "name": "File2", "isFile": true, "creation_date": "2023-10-09","location": "file2.location" },
        { "name": "Folder1", "isFile": false, "creation_date": "2009-09-09","location": "folder2.location" },
        { "name": "Folder2", "isFile": false, "creation_date": "2002-01-04","location": "folder2.location" },
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
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center">Own Space</h1>
        <h1>My Boxページ</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Data Info</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {item.isFile ? (
                    <Image src="/file.png" alt="file" width={30} height={30}/>
                    ) : (
                    <Image src="/folder.png" alt="folder" width={30} height={30} onClick={() => getDate(item.location)}/>
                      )}    
                </td>
                {item.isFile ? (
                  <td className="border px-4 py-2">{item.name}</td>
                    ) : (
                  <td className="border px-4 py-2" onClick={() => getDate(item.location)}>{item.name}</td>
                )}   
                <td className="border px-4 py-2">{date.owner}</td>
                <td className="border px-4 py-2">{item.creation_date}</td>
                <td className="border px-4 py-2 flex">
                  {item.isFile ? (
                    <>
                      <Image
                        src="/download.png"
                        alt="Download"
                        width={30}
                        height={30}
                        onClick={() => handleDownload(item.location)}
                      />
                      <Image
                        src="/delete.png"
                        alt="Delete"
                        width={30}
                        height={30}
                        onClick={() => handleDelete(item.location)}
                      />
                    </>
                  ) : (
<>
                      <Image
                        src="/download.png"
                        alt="Download"
                        width={30}
                        height={30}
                        onClick={() => handleDownload(item.location)}
                      />
                      <Image
                        src="/delete.png"
                        alt="Delete"
                        width={30}
                        height={30}
                        onClick={() => handleDelete(item.location)}
                      />
                    </>
                  )}
                </td>  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // </DataProvider>
  )     
};
export default Folder;