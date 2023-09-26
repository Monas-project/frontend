"use client";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { useState } from 'react';
import { NavigationSidebar } from '../../components/navigation/navigation-sidebar';
import Files from "@/components/Files";
// import { useData, DataProvider } from "@/context/metaData";

const MyBox = () => {  
  const router = useRouter();
  const searchParams = useSearchParams()
  // const cid = searchParams.get('cid');
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

  // path作成--------------------------------------------------
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [nextPath, setNextPath] = useState<string>('');

  const addItem = () => {
    if (nextPath.trim() !== '') {
      setCurrentPath([...currentPath, nextPath]);
      setNextPath('');
    }
  };

  const removeLastItem = () => {
    if (currentPath.length > 0) {
      const newArray = [...currentPath];
      newArray.pop();
      setCurrentPath(newArray);
    }
  };

  // 配列の要素を文字列に変換する関数
  const pathToString = (array: string[]) => {
    return '/' + array.join('/') + '/';
  };
  // path作成--------------------------------------------------


  const [date, setDate] = useState(root);
  const [dataList, setDataList] = useState(root.child);
  const [owner, setOwner] = useState("0x253...354");

  // ポップアップ用のState--------------------------------------------------
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
    // ポップアップを表示する関数
    const openPopup = () => {
      setIsPopupOpen(true);
    };
      // ポップアップを閉じる関数
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedFile(null);
    setName('');
    setPath('');
  };

  // ファイルアップロードとJSON形式への整形
  const uploadAndFormat = async () => {
    if (!selectedFile || !name || !path) {
      // 必要な情報が足りない場合のエラーハンドリング
      alert('必要な情報を入力してください');
      return;
    }

    // JSON形式に整形
    const formattedData = {
      name: name,
      path: path,
      location: cid,
    };
    console.log("formattedData", formattedData)

    // データを使って必要な処理を実行する（例：API呼び出し、データの保存など）

    // ポップアップを閉じる
    closePopup();
  };


  const uploadFile = async (fileToUpload: any) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", fileToUpload, fileToUpload.name);
      console.log("formData", formData)
      const res = await fetch("/api", {
        method: "POST",
        body: formData,
      });
      console.log("res", res)
      const ipfsHash = await res.text();
      setCid(ipfsHash);
      // console.log("ipfsHash", ipfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };
  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };
  // ポップアップ用のState--------------------------------------------------



  // / My Boxを初期状態にリセットする関数
  // const resetMyBox = () => {
  //   // 初期データまたはAPIからデータを再取得して、setDataListでセットする
  //   setDataList(root.child);
  // }
  
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

  const handleCreateFolder = () => {
    // フォルダ作成の処理をここに追加
  };

  const handleUploadFile = () => {
    // ファイルアップロードの処理をここに追加
  };
  
  return (
    // <DataProvider>
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
      
        <h1 className="text-4xl font-bold text-center">Own Space</h1>
        <div className="flex justify-end space-x-4 p-4">
          <button
            onClick={handleCreateFolder}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Folder
          </button>
          <button
            onClick={openPopup}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload File
          </button>
        </div>
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
      {/* ファイルアップロードポップアップ */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-4 rounded shadow-lg w-96">
            <h2 className="text-lg text-gray-600 font-semibold mb-4">Upload File</h2>
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleFileChange}
              className="mb-2"
            />
            {cid && (
                  <Files cid={cid} />
                )}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2 p-2 border border-gray-300 text-gray-600 rounded w-full"
            />
            <input
              type="text"
              placeholder="Path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="mb-4 p-2 border border-gray-300 text-gray-600 rounded w-full"
            />
            <button
              onClick={uploadAndFormat}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload
            </button>
            <button
              onClick={closePopup}
              className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    // </DataProvider>
  )     
};
export default MyBox;