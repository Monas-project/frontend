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
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
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

  const openSharePopup = () => {
    setIsSharePopupOpen(true);
  };
  const closeSharePopup = () => {
    setIsSharePopupOpen(false);
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

  
   
  const handleSahre = (location: string) => {
    openSharePopup();
  };
  const handleDownload = (location: string) => {
    // delete処理
  };

  
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
      <div className='bg-pink03 w-4/5 h-4/5 rounded-full'></div>
    </div>
    <div className='bg-white m-1.25rem rounded p-1rem space-y-1rem' style={{ gridArea: 'c' }}>
      
      <h1 className="text-heading">Own Space</h1>
      <div>
          <p>{pathToString(currentPath)}</p>
          <button
            onClick={backData}
            className="text-lg text-gray-600 font-semibold mb-4"
          >Back
          </button>
        </div>

      <div className='w-full flex flex-row justify-between items-center font-normal text-black02'>
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
            onClick={openFolderPopup}
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
            onClick={openFilePopup}
          >

            <span className='w-1.25rem h-1.25rem ml-2rem'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                <path fill='#FF4185' d="M6 2a2 2 0 0 0-2 2v5.207a5.48 5.48 0 0 1 1-.185V4a1 1 0 0 1 1-1h4v3.5A1.5 1.5 0 0 0 11.5 8H15v8a1 1 0 0 1-1 1h-3.6a5.507 5.507 0 0 1-.657 1H14a2 2 0 0 0 2-2V7.414a1.5 1.5 0 0 0-.44-1.06l-3.914-3.915A1.5 1.5 0 0 0 10.586 2H6Zm8.793 5H11.5a.5.5 0 0 1-.5-.5V3.207L14.793 7ZM5.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9Zm2.354-4.854a.5.5 0 1 1-.708.708L6 13.707V16.5a.5.5 0 0 1-1 0v-2.793l-1.146 1.147a.5.5 0 1 1-.708-.707l2-2A.5.5 0 0 1 5.497 12h.006a.498.a498 0 0 1 .348.144l.003.003l2 2Z" />
              </svg>
            </span>
            <p className='pl-1rem pr-2rem'>Upload File</p>
            <span className='w-0.5rem'></span>
          </button>

        </div>
        
      </div>


      <div className='w-full font-normal'>
        <h2 className='mb-1rem'>Suggested</h2>
        <div className='flex flex-wrap justify-between gap-4 h-13rem overflow-hidden'>
          <div className='border rounded-md w-23% bg-gray-100'></div>
          <div className='border rounded-md w-23% bg-gray-100'></div>
          <div className='border rounded-md w-23% bg-gray-100'></div>
          <div className='border rounded-md w-23% bg-gray-100'></div>
        </div>
      </div>

      
        {root?.child && Object.keys(root.child).length > 0 ? (
          <table className="w-full text-left">
          <thead>
            <tr className='border-b border-gray01'>
              <th className="w-4.5% p-0.5rem font-normal">Name</th>
              <th className="w-49% font-normal"></th>
              <th className="w-11.5% font-normal">Owner</th>
              <th className="w-20% font-normal">Data Modified</th>
              <th className="w-15% font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(root?.child).map(([path, item], index) => (
              <tr key={index}>
                <td className="p-0.5rem border-b border-gray01">
                  {!item.is_directory ? (
                    <a href={"https://gateway.pinata.cloud/ipfs/" + item.cid} target="_blank">
                      <Image src="/document-24-filled.svg" alt="file" width={25} height={25} />
                    </a>
                  ) : (
                    <Image src="/folder-24-filled.svg" alt="folder" width={25} height={25} onClick={() => nextData(path)} />
                  )}
                </td>
                {!item.is_directory ? (
                  <td className="border-b border-gray01">{item.name}</td>
                ) : (
                  <td className="border-b border-gray01" onClick={() => nextData(path)}>{item.name}</td>
                )}
                <td className="border-b border-gray01">{item.metadata_cid}</td>
                <td className="border-b border-gray01">{item.creation_date}</td>
                <td className="py-0.5rem border-b border-gray01 space-x-1rem">
                  {!item.is_directory ? (
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
                        onClick={() => handleSahre()}
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
                        onClick={() => handleSahre()}
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
        ) : (
          <h2 className="text-center text-gray-600">You don't have your data</h2>
        )}
    </div>
    {isFilePopupOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-200 p-4 rounded shadow-lg">
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
    {isSharePopupOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-200 p-4 rounded shadow-lg">
          <h2 className="text-lg text-gray-600 font-semibold mb-4">Keep The Key Secret</h2>
          <h3 className="text-lg text-gray-600 font-semibold mb-4">BvOA9Fxk4lsa7TeUiGWBDnoJbZ3UPXk69nxiitoyMyQ=</h3>
          <button
            onClick={closeSharePopup}
            className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded mt-2"
          >
            OK
          </button>
        </div>
        
      </div>
    )}
  </div>
</div>

  )     
};

export default MyBox;
