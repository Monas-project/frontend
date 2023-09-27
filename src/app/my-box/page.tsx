"use client";
import Link from 'next/link';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { NavigationSidebar } from '../../components/navigation/navigation-sidebar';
import Files from "@/components/Files";
import { useDataContext } from "@/context/metaData";
import { uploadFolderAPI } from "@/utils/api/uploadFolder";
import { uploadFileAPI } from "@/utils/api/uploadFile";
import { fetchAPI } from "@/utils/api/fetch";


const MyBox = () => {  
  const router = useRouter();
  const searchParams = useSearchParams()
  const { root, setRoot } = useDataContext();
  const [rootId, setRootId] = useState('');
  console.log("root", root)
  const childData = root?.child || {};
  console.log("childData", childData)

  useEffect(() => {
    const getRoot = async () => {
      const cid = searchParams.get('cid');
      if (!cid) {
        return;
      }
      try {
        setRootId(cid);
        console.log("data", root);
        setRoot(root);
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    getRoot();
  },[])

  // const root = {
  //   "name": "Root",
  //   "owner": "0x123...576",
  //   "creation_date": "",
  //   "location": "", 
  //   "parent": { "name": "", "location": "" },
  //   "child": [
  //       { "name": "AAAAAAAAAAAAAAAAFile1", "isFile": true, "creation_date": "2023-09-09", "location": "file1.location" },
  //       { "name": "File2", "isFile": true, "creation_date": "2023-10-09","location": "file2.location" },
  //       { "name": "Folder1", "isFile": false, "creation_date": "2009-09-09","location": "folder2.location" },
  //       { "name": "Folder2", "isFile": false, "creation_date": "2002-01-04","location": "folder2.location" },
  //   ]
  // };

  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [nextPath, setNextPath] = useState<string>('');

  const addItem = (name: string) => {
      setCurrentPath([...currentPath, name]);
  };

  const removeLastItem = () => {
    if (currentPath.length > 0) {
      const newArray = [...currentPath];
      newArray.pop();
      setCurrentPath(newArray);
    }
  };

  const nextData = async (path: string) => {
    console.log("直前nextData currentPath", currentPath)
    // const folderId = "38745683465";
    // router.push(`/my-box`);
    console.log("NEXT path", path)
    // const fetchPath = pathToString(path)
    // console.log("NEXT path", fetchPath)
    const data: any = await fetchAPI(path);
    console.log("NEXT fetch後data", data)
    setRoot(data);
    // const nextPath = addItem(data.name);
    setCurrentPath([...currentPath, data.name]);
    console.log("後nextData currentPath", currentPath)
    // setCurrentPath()
    // addItem(data.name);
  };

  const backData = async () => {
    console.log("直前backData currentPath", currentPath)
    const pathForPop = [...currentPath]
    console.log("Back:currentPath", currentPath)
    pathForPop.pop()
    console.log("Back:currentPath", currentPath)
    console.log("Back:pathForPop", pathForPop)
    const path = pathToString(pathForPop)
    console.log("path", path)
    const data: any = await fetchAPI(path);
    console.log("BACKfetch後data", data)
    setRoot(data);
    setCurrentPath(pathForPop)
    console.log("後backData currentPath", currentPath)
  }

  

  const pathToString = (array: string[]) => {
    return '/' + array.join('/');
  };

  const [date, setDate] = useState(root);
  const [dataList, setDataList] = useState(root?.child || []);
  const [owner, setOwner] = useState("0x253...354");

  const [isFilePopupOpen, setIsFilePopupOpen] = useState(false);
  const [isFolderPopupOpen, setIsFolderPopupOpen] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [path, setPath] = useState('');
  // const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const openFilePopup = () => {
    setIsFilePopupOpen(true);
  };

  const closeFilePopup = () => {
    setIsFilePopupOpen(false);
    setCid("");
    setFileName('');
    setPath('');
  };
  const openFolderPopup = () => {
    setIsFolderPopupOpen(true);
  };

  const closeFolderPopup = () => {
    setIsFolderPopupOpen(false);
    setFolderName('');
    setPath('');
  };

  const uploadData = async () => {
    if (!cid || !fileName) {
      alert('必要な情報を入力してください');
      return;
    }

    // addItem(fileName);
    // pathToString(currentPath);

    const pathForPush = [...currentPath]
    pathForPush.push(fileName)
    const path = pathToString(pathForPush)

    const formattedData = {
      name: fileName,
      path: path,
      isDirectory: false,
      data_cid: cid,
    };
    console.log("formattedData", formattedData)

    // データを使って必要な処理を実行する（例：API呼び出し、データの保存など）
    try {
      const data: any = await uploadFileAPI(formattedData);
      console.log("metadata", data);
      setRoot(data);
      // router.push(`/my-box?cid=${rootId}`);
    } catch (error) {
      console.error('UploadFile error:', error);
    }
    console.log("ファイルupload", currentPath)
    closeFilePopup();
  };

  const uploadFile = async (file: any) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file, file.name);
      const res = await axios.post(
        // APIのURL
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        // req params
        formData,
        // header
        {
          headers: {
            accept: 'application/json',
            pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
            'Content-Type': `multipart/form-data; boundary=${formData}`,
          },
        },
      );
      const cid = await res.data.IpfsHash;
      console.log("cid", cid)
      setCid(cid);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleFileChange = (e: any) => {
    console.log("e.target.files[0]", e.target.files[0])
    // setSelectedFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };

  // フォルダアップロード
  const handleCreateFolder = async (e: any) => {
    if (!folderName) {
      alert('必要な情報を入力してください');
      return;
    }

    const pathForPush = [...currentPath]
    pathForPush.push(folderName)
    const path = pathToString(pathForPush)

    const formattedData = {
      name: folderName,
      path: path,
      isDirectory: true,
      data_cid: "",
    };
    console.log("formattedData", formattedData)

    // データを使って必要な処理を実行する（例：API呼び出し、データの保存など）
    try {
      const data: any = await uploadFolderAPI(formattedData);
      console.log("metadata", data);
      
      setRoot(data);
      // router.push(`/my-box?cid=${rootId}`);
    } catch (error) {
      console.error('UploadFolder error:', error);
    }
    console.log("フォルダupload", currentPath)

    closeFolderPopup();
  };

  
   
  const handleDelete = (location: string) => {
    // delete処理
  };
  const handleDownload = (location: string) => {
    // delete処理
  };

  
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center">Own Space</h1>
        <div className="flex justify-end space-x-4 p-4">
          <button
            onClick={openFolderPopup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Folder
          </button>
          <button
            onClick={openFilePopup}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload File
          </button>
        </div>
        <div>
          <p>{pathToString(currentPath)}</p>
          <button
              onClick={backData}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Back
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
          {root?.child && Object.keys(root.child).length > 0 ? (
          <tbody>
            {Object.entries(root?.child).map(([path, item], index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {!item.is_directory ? (
                    <a href={"https://gateway.pinata.cloud/ipfs/" + item.cid} target="_blank">
                    <Image src="/file.png" alt="file" width={30} height={30}  />
                    </a>
                    ) : (
                    <Image src="/folder.png" alt="folder" width={30} height={30} onClick={() => nextData(path)}/>
                      )}    
                </td>
                {!item.is_directory ? (
                  <td className="border px-4 py-2">{item.name}</td>
                    ) : (
                  <td className="border px-4 py-2" onClick={() => nextData(path)}>{item.name}</td>
                )}   
                <td className="border px-4 py-2">{item.metadata_cid}</td>
                <td className="border px-4 py-2">{item.creation_date}</td>
                <td className="border px-4 py-2 flex">
                  {!item.is_directory ? (
                    <>
                      <Image
                        src="/download.png"
                        alt="Download"
                        width={30}
                        height={30}
                        onClick={() => handleDownload(item.cid)}
                      />
                      <Image
                        src="/delete.png"
                        alt="Delete"
                        width={30}
                        height={30}
                        onClick={() => handleDelete(item.cid)}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src="/download.png"
                        alt="Download"
                        width={30}
                        height={30}
                        onClick={() => handleDownload(item.cid)}
                      />
                      <Image
                        src="/delete.png"
                        alt="Delete"
                        width={30}
                        height={30}
                        onClick={() => handleDelete(item.cid)}
                      />
                    </>
                  )}
                </td>  
              </tr>
            ))}
          </tbody>
          ) : (
            <tbody>
            <tr>
            <td className="text-center text-gray-600">You don't have your data</td>
            </tr>
            </tbody>
          )}
        </table>
      </div>
      {isFilePopupOpen && (
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
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="mb-2 p-2 border border-gray-300 text-gray-600 rounded w-full"
            />
            {/* <input
              type="text"
              placeholder="Path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="mb-4 p-2 border border-gray-300 text-gray-600 rounded w-full"
            /> */}
            <button
              onClick={uploadData}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              add data
            </button>
            <button
              onClick={closeFilePopup}
              className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isFolderPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-4 rounded shadow-lg w-96">
            <h2 className="text-lg text-gray-600 font-semibold mb-4">Create Folder</h2>
            <input
              type="text"
              placeholder="Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="mb-2 p-2 border border-gray-300 text-gray-600 rounded w-full"
            />
            <button
              onClick={handleCreateFolder}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Folder
            </button>
            <button
              onClick={closeFolderPopup}
              className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )     
};

export default MyBox;
