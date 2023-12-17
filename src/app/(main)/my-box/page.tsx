"use client";
import Link from 'next/link';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { use, useEffect, useState, Fragment, useRef } from 'react';
import Files from "@/components/Files";
import { useDataContext } from "@/context/metaData";
import { useWalletContext } from "@/context/ownerAddress";
import { uploadFolderAPI } from "@/utils/api/uploadFolder";
import { uploadFileAPI } from "@/utils/api/uploadFile";
import { fetchAPI } from "@/utils/api/fetch";
import { Topbar } from '@/components/topbar/topbar';
import {
  Grid16Filled,
  CaretDown12Filled,

  DocumentText24Filled,
  Image24Filled,
  DocumentPdf24Filled,
  Video24Filled,
  Folder24Filled,
  FolderZip24Filled,

  DocumentArrowUp20Regular,
  FolderAdd20Regular,

  ArrowDownload16Regular,
  Share16Regular,
  Delete16Regular,
  Key16Regular,

  Copy20Regular,
} from '@fluentui/react-icons';
import { Menu, Transition, Dialog } from '@headlessui/react';
import DragDrop from '@/components/DragDrop';
import Lottie from 'lottie-react';
import uploadFileCat from "@/components/uploadFileCat.json";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const MyBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const { root, setRoot } = useDataContext();
  const { walletData } = useWalletContext();
  const [rootId, setRootId] = useState('');
  // console.log("walletData", walletData.address)
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
        console.log("root data", root);
        setRoot(root);
        // localStorage.setItem('root', Jsonroot);
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    getRoot();
  }, [])

  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddree');
    console.log("walletAddress", walletAddress); // wallet string
    if (!walletAddress) {
          console.log("ifの中wallet.address", walletAddress);
          router.push(`/`);
      }
  }, [])

  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const nextData = async (path: string) => {
    console.log("直前nextData currentPath", currentPath)
    console.log("NEXT path", path)
    const data: any = await fetchAPI(path);
    console.log("NEXT fetch後data", data)
    setRoot(data);
    setCurrentPath([...currentPath, data.name]);
    console.log("後nextData currentPath", currentPath)
  };

  const backData = async () => {
    const pathForPop = [...currentPath]
    pathForPop.pop()
    const path = pathToString(pathForPop)
    const data: any = await fetchAPI(path);
    setRoot(data);
    setCurrentPath(pathForPop)
  }

  const pathToString = (array: string[]) => {
    return '/' + array.join('/');
  };

  const [isFilePopupOpen, setIsFilePopupOpen] = useState(false);
  const [isFolderPopupOpen, setIsFolderPopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [path, setPath] = useState('');
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileData, setFileData] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);

  const openFilePopup = () => {
    setIsFilePopupOpen(true);
  };

  const closeFilePopup = () => {
    setIsFilePopupOpen(false);
    setCid("");
    setFileName('');
    setPath('');
    setProgress(0);
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
    if (!fileData || !fileName) {
      alert('必要な情報を入力してください');
      return;
    }

    //Ja:パスの組み立て
    //En:Assembling pasts
    const pathForPush = [...currentPath]
    pathForPush.push(fileName)
    const path = pathToString(pathForPush)

    const apiUrl = 'http://localhost:8000/upload';

    const formData = new FormData();
    formData.append("name", fileName);
    formData.append("id", walletData?.address || ""); // Ja:walletDataがnullの場合のためのフォールバック  En: fallback for cases where walletData is null
    formData.append("path", path);
    formData.append("isDirectory", "false");
    if (fileData) {
      formData.append("data", fileData);
    }
    const formDataEntries = Array.from(formData.entries());
      for (let [key, value] of formDataEntries) {
      console.log("formData");
      console.log(key, value);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      console.log("response", response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRoot(data);
      // router.push(`/my-box?cid=${rootId}`);
    } catch (error) {
      console.error('フォルダのアップロード中にエラーが発生しました:', error);
    }
    closeFilePopup();
  };

  /* const uploadFile = async (file: any) => {
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
  }; */

  const handleFileChange = (e: any) => {
    console.log("e.target.files[0]", e.target.files[0])
    // setSelectedFile(e.target.files[0]);
    setFileData(e.target.files[0]);
  };

  // // フォルダアップロード
  // const handleCreateFolder = async (e: any) => {
  //   if (!folderName) {
  //     alert('必要な情報を入力してください');
  //     return;
  //   }

  //   const pathForPush = [...currentPath]
  //   pathForPush.push(folderName)
  //   const path = pathToString(pathForPush)

  //   const formattedData = {
  //     name: folderName || "",
  //     id: walletData?.address || "",
  //     path: path || "",
  //     isDirectory: true,
  //     data: "",
  //   };
  //   console.log("formattedData", formattedData)

  //   // データを使って必要な処理を実行する（例：API呼び出し、データの保存など）
  //   try {
  //     const data: any = await uploadFolderAPI(formattedData);
  //     console.log("metadata", data);

  //     setRoot(data);
  //     // router.push(`/my-box?cid=${rootId}`);
  //   } catch (error) {
  //     console.error('UploadFolder error:', error);
  //   }
  //   console.log("フォルダupload", currentPath)

  //   closeFolderPopup();
  // };
  const handleCreateFolder = async () => {
    if (!folderName) {
      alert('必要な情報を入力してください');
      return;
    }

    // パスの組み立て
    const pathForPush = [...currentPath]
    pathForPush.push(folderName)
    const path = pathToString(pathForPush)

    const apiUrl = 'http://localhost:8000/upload';

    const formData = new FormData();
    formData.append("name", folderName);
    formData.append("id", walletData?.address || ""); // walletDataがnullの場合のためのフォールバック
    formData.append("path", path);
    formData.append("isDirectory", "true");
    // formData.append("data", "");  // ここで実際のファイルオブジェクトを追加する場合、第二引数にファイルオブジェクトを指定します
    // const formDataEntries = Array.from(formData.entries());
    //   for (let [key, value] of formDataEntries) {
    //   console.log("formData");
    //   console.log(key, value);
    // }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      console.log("response", response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRoot(data);
      // router.push(`/my-box?cid=${rootId}`);
    } catch (error) {
      console.error('フォルダのアップロード中にエラーが発生しました:', error);
    }

    closeFolderPopup();
  }

  const getDecryptKey = async (item_path: string) => {
    console.log("-----------------getDecryptKey--------------------------")
    console.log("item_path", item_path)

    const apiUrl = 'http://localhost:8000/fetchkey';

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: item_path }),
      });

      console.log("response", response)

      if (!response.ok) {
        const errorBody = await response.json(); // エラーレスポンスのボディを取得
        console.error('サーバーからのエラーレスポンス:', errorBody);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('keyの取得中にエラーが発生しました:', error);
    }
  };

  const handleSahre = (location: string) => {
    openSharePopup();
  };

  const handleDownload = (location: string) => {
    // delete処理
  };

  const filterTypeContents = [
    { name: 'documents', icon: <DocumentText24Filled /> },
    { name: 'Photos & images', icon: < Image24Filled /> },
    { name: 'PDFs', icon: <DocumentPdf24Filled /> },
    { name: 'Videos', icon: <Video24Filled /> },
    { name: 'Folders', icon: <Folder24Filled /> },
    { name: 'Archives', icon: <FolderZip24Filled /> },
  ];

  const recentContents = [
    { content: "", title: "aaaaaaaaaaaaaa", date: "3 days ago" },
    { content: "", title: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", date: "20 days ago" },
    { content: "", title: "ccccccccccc", date: "5 months ago" },
    { content: "", title: "ddddd", date: "7 months ago" },
    { content: "", title: "eeeeeeeeeeeeeeeeeeeeeee", date: "11 months ago" },
  ];

  // Ja:フォルダーtableの表題
  // En: Title of folder table
  const fileTableTr = [
    { key: 'folder', th: '', width: '0%' },
    { key: 'name', th: 'Name', width: '63.7%' },
    { key: 'owner', th: 'Owner', width: '12%' },
    { key: 'dataModified', th: 'Data Modified', width: '13.7%' },
    { key: 'action', th: '', width: '10.6%' },
  ];

  // アクションボタン
  //Action button
  const fileTableAction = [
    { icon: <ArrowDownload16Regular />, alt: 'Download', onclick: handleDownload },
    { icon: <Share16Regular />, alt: 'Share', onclick: handleSahre },
    { icon: <Delete16Regular />, alt: 'Delete', onclick: 'handleDelete' },
    { icon: <Key16Regular />, alt: 're-encryt', onclick: '' },
  ];

  // Upload File, Create Folder - inputが未入力
  const isExistFileName = !!RegExp(/[^\n]/).exec(fileName);
  const isExistFolderName = !!RegExp(/[^\n]/).exec(folderName);

  let changeFocusRef = useRef(null);

  // クリップボードにコピー
  // Clipboard Copy
  const share_key = "BvOA9Fxk4lsa7TeUiGWBDnoJbZ3UPXk69nxiitoyMyQ=";
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(share_key);
      alert('Coppied to clipboard.');
    } catch (err) {
      alert('Failed to copy to clipboard.');
      console.error(err);
    }
  };

  return (
    <div className='h-full flex flex-col'>
      {/* コンテンツ上部 */}
      <div className='sticky top-0'>
        <Topbar />
        <div className='border-b-1 px-9 py-4 space-y-3
                      border-lightContentsBorder 
                      dark:border-darkContentsBorder'>
          <div className='flex flex-rows items-center justify-between'>
            <h1 className='text-title'>Own Space</h1>
            <div className='flex flex-row'>
              <p>{pathToString(currentPath)}</p>
              <button
                onClick={backData}
                className=""
              >Back
              </button>
            </div>
            <button title='girid or list' type='button'><Grid16Filled /></button>
          </div>
          <div className='flex flex-rows justify-between items-center text-14'>
            {/* フィルターボタン 3つ */}
            <div className='flex flex-row space-x-2.5'>
              <Menu as="div" className="relative">
                <Menu.Button className="border border-lightItemBorder dark:border-darkItemBorder px-6 py-2 rounded-lg hover:bg-lightHoverBtn dark:hover:bg-darkHoverBtn">
                  Type<CaretDown12Filled aria-hidden="true" className='ml-3.5' />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute left-0 top-10 origin-top-left rounded-lg  shadow-lg ring-1 focus:outline-none 
                                        bg-lightDropDownBg ring-lightContentsBorder 
                                        dark:bg-darkDropDownBg dark:ring-darkContentsBorder">
                    <div className="p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <div className='grid grid-cols-filterGrid gap-5'>
                            {filterTypeContents.map((item) => (
                              <button key={item.name} className='flex flex-col rounded-lg justify-center items-center self-center min-w-filterItemGrid aspect-square space-y-2
                                                                hover:bg-lightHoverBtn dark:hover:bg-darkHoverBtn'>
                                <div>{item.icon}</div>
                                <div className='whitespace-nowrap'>{item.name}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative">
                <Menu.Button className="border border-lightItemBorder dark:border-darkItemBorder px-6 py-2 rounded-lg hover:bg-lightHoverBtn dark:hover:bg-darkHoverBtn">
                  Piople<CaretDown12Filled aria-hidden="true" className='ml-3.5' />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute left-0 top-10 origin-top-left rounded-lg  shadow-lg ring-1 focus:outline-none 
                                        bg-lightDropDownBg ring-lightContentsBorder 
                                        dark:bg-darkDropDownBg dark:ring-darkContentsBorder">
                    <div className="p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <div className='grid grid-cols-filterGrid gap-5'>
                            {filterTypeContents.map((item) => (
                              <button key={item.name} className='flex flex-col rounded-lg justify-center items-center self-center min-w-filterItemGrid aspect-square space-y-2
                                                                hover:bg-lightHoverBtn dark:hover:bg-darkHoverBtn'>
                                <div>{item.icon}</div>
                                <div className='whitespace-nowrap'>{item.name}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative">
                <Menu.Button className="border border-lightItemBorder dark:border-darkItemBorder px-6 py-2 rounded-lg hover:bg-lightHoverBtn dark:hover:bg-darkHoverBtn">
                  Modified<CaretDown12Filled aria-hidden="true" className='ml-3.5' />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute left-0 top-10 origin-top-left rounded-lg  shadow-lg ring-1 focus:outline-none 
                                        bg-lightDropDownBg ring-lightContentsBorder 
                                        dark:bg-darkDropDownBg dark:ring-darkContentsBorder">
                    <div className="p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <div className='grid grid-cols-filterGrid gap-5'>
                            {filterTypeContents.map((item) => (
                              <button key={item.name} className='flex flex-col rounded-lg justify-center items-center self-center min-w-filterItemGrid aspect-square space-y-2
                                                                hover:bg-lightHoverBtn dark:hover:bg-darkHoverBtn'>
                                <div>{item.icon}</div>
                                <div className='whitespace-nowrap'>{item.name}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* UploadFile,CreateFolderボタン */}
            <div className='flex flex-row space-x-2.5'>
              <button type='button'
                onClick={openFilePopup}
                className='flex justify-center px-6 py-3 rounded-lg border
                                                        border-lightItemBorder hover:bg-lightHoverBtn 
                                                        dark:border-darkItemBorder dark:hover:bg-darkHoverBtn'>
                <DocumentArrowUp20Regular className='mr-3.5' />
                Upload File
              </button>

              <button onClick={openFolderPopup} className='flex justify-center px-6 py-3 rounded-lg border
                                                        border-lightItemBorder hover:bg-lightHoverBtn 
                                                        dark:border-darkItemBorder dark:hover:bg-darkHoverBtn'>
                <FolderAdd20Regular className='mr-3.5' />
                Creat Folder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 本体 */}
      <div className='h-full box-border  p-5 flex flex-col space-y-8 overflow-hidden overflow-y-scroll'>
        {/* WelcomeCat,Recent */}
        <div className='flex flex-row flex-none space-x-8'>
          {/* WelcomeCat */}
          <svg xmlns="http://www.w3.org/2000/svg" className='w-welcomeCatWidth h-auto' viewBox="0 0 340 175.45">
            <use xlinkHref="/welcome_cats.svg#welcomeCat" />
          </svg>
          {/* Recent */}
          <div className='space-y-3.5'>
            <h2>Recent</h2>
            <div className='grid grid-cols-5 gap-x-2.5'>
              {recentContents.map((item) => (
                <div key={item.title} className='space-y-1.5'>
                  <div className='aspect-video bg-lightSkelton01 dark:bg-darkSkelton01 rounded-lg'></div>
                  <div className='truncate w-11/12 leading-recentText bg-lightSkelton02 dark:bg-darkSkelton01'>{item.title}</div>
                  <div className='w-7/12 text-recentContentsDate bg-lightSkelton02 dark:bg-darkSkelton01'>{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ファイル用テーブル */}
        <div className='grow text-left font'>
          {root?.child && Object.keys(root.child).length > 0 ? (
            <table className='table-fixed w-full'>
              <thead>
                <tr>{fileTableTr.map((x) => (
                  <th key={x.key} style={{ width: x.width }} className='py-1.5 first:absolute [&:nth-child(2)]:pl-7 last:pr-7 font-normal text-tableTh'>
                    {x.th}
                  </th>
                ))}</tr>
              </thead>
              <tbody>
                {Object.entries(root?.child).map(([path, item], index) => (
                  <tr key={index}
                    className='group border-y hover:outline hover:outline-1 hover:outline-pink01 relative
                    border-y-lightTableBorder hover:bg-lightHoverTrBg
                    dark:border-y-darkTableBorder dark:hover:bg-darkHoverTrBg
                    [&_td]:pr-3 [&_td]:py-[0.797rem] [&_td]:truncate'>

                    {/* File,Folder */}
                    <td className='absolute' style={{ overflow: 'visible', paddingTop: "0.48rem", paddingLeft: '1.75rem'/* 28px - 表題と同じ*/ }}>
                      {!item.is_directory ? (
                        <button title='file' type='button' className='text-document pt-[0.18rem]'>
                          <a href={"https://gateway.pinata.cloud/ipfs/" + item.metadata_cid} target="_blank">
                            <DocumentText24Filled />
                          </a>
                        </button>
                      ) : (
                        <button title='file' type='button' onClick={() => nextData(path)} className='text-folder pt-[0.18rem]'>
                          <Folder24Filled />
                        </button>
                      )}
                    </td>

                    {/* Name */}
                    <td className='pl-20'>
                      {!item.is_directory ? (
                        <div>
                          {item.name}
                        </div>
                      ) : (
                        <div onClick={() => nextData(path)}>{item.name}</div>
                      )}
                    </td>

                    {/* Owner */}
                    <td>{walletData.address}</td>

                    {/* DataModified */}
                    <td>{item.creation_date}</td>

                    <td>
                      <button onClick={() => getDecryptKey(path)}>鍵</button>
                    </td>

                    {/* action */}
                    <td className='pr-7 text-center space-x-3.5' style={{ paddingTop: "0.5rem", paddingRight: '1.75rem'/* 28px - 表題と同じ*/ }}>
                      {fileTableAction.map((contents) => (
                        <button key={contents.alt} onClick={contents.onclick} className='invisible group-hover:visible'>
                          <div>{contents.icon}</div>
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='flex justify-center space-x-2 items-center'>
              <p className="float-left">You don't have your data</p>
              <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="#FFB02E" />
                  <path d="M15 16.5C15 18.9853 12.9853 21 10.5 21C8.01472 21 6 18.9853 6 16.5C6 14.0147 8.01472 12 10.5 12C12.9853 12 15 14.0147 15 16.5Z" fill="white" />
                  <path d="M25.96 16.48C25.96 18.9542 23.9542 20.96 21.48 20.96C19.0058 20.96 17 18.9542 17 16.48C17 14.0058 19.0058 12 21.48 12C23.9542 12 25.96 14.0058 25.96 16.48Z" fill="white" />
                  <path d="M10.88 12C8.74 12 7 13.74 7 15.88C7 18.02 8.74 19.76 10.88 19.76C13.02 19.76 14.76 18.02 14.76 15.88C14.76 13.74 13.02 12 10.88 12Z" fill="#402A32" />
                  <path d="M20.88 12C18.74 12 17 13.74 17 15.88C17 18.02 18.74 19.76 20.88 19.76C23.02 19.76 24.76 18.02 24.76 15.88C24.76 13.74 23.02 12 20.88 12Z" fill="#402A32" />
                  <path d="M13.1626 15.9369C13.908 15.6999 14.2117 14.8666 13.8436 14.0716C13.4755 13.2842 12.5828 12.8255 11.8374 13.0625C11.092 13.2995 10.7883 14.1328 11.1564 14.9278C11.5245 15.7228 12.4172 16.1739 13.1626 15.9369Z" fill="white" />
                  <path d="M23.1626 15.9369C23.908 15.6999 24.2117 14.8666 23.8436 14.0716C23.4755 13.2842 22.5736 12.8255 21.8374 13.0625C21.092 13.2995 20.7883 14.1328 21.1564 14.9278C21.5245 15.7228 22.4172 16.1739 23.1626 15.9369Z" fill="white" />
                  <path d="M8.95171 9.19972C9.49215 8.72506 9.82675 8.07318 10.0174 7.36929C10.0896 7.10275 10.3642 6.9452 10.6307 7.01739C10.8973 7.08958 11.0548 7.36417 10.9826 7.63071C10.7577 8.46121 10.3423 9.30933 9.61161 9.95107C8.87301 10.5998 7.85473 11 6.5 11C6.22386 11 6 10.7761 6 10.5C6 10.2239 6.22386 10 6.5 10C7.64527 10 8.4192 9.66742 8.95171 9.19972Z" fill="#402A32" />
                  <path d="M14.8961 25.4453C14.8941 25.4481 14.8936 25.4489 14.8944 25.4472C14.6474 25.9412 14.0468 26.1414 13.5528 25.8944C13.0588 25.6474 12.8586 25.0468 13.1056 24.5528C13.4341 23.8958 14.4046 23 16 23C17.5954 23 18.5659 23.8958 18.8944 24.5528C19.1414 25.0468 18.9412 25.6474 18.4472 25.8944C17.9532 26.1414 17.3526 25.9412 17.1056 25.4472C17.1057 25.4474 17.1059 25.4479 17.1056 25.4472L17.1039 25.4453C17.091 25.4273 17.018 25.3246 16.8527 25.22C16.6796 25.1104 16.4061 25 16 25C15.5939 25 15.3204 25.1104 15.1473 25.22C14.982 25.3246 14.909 25.4273 14.8961 25.4453Z" fill="#402A32" />
                  <path d="M21.9826 7.36929C22.1733 8.07318 22.5079 8.72506 23.0483 9.19972C23.5808 9.66742 24.3547 10 25.5 10C25.7761 10 26 10.2239 26 10.5C26 10.7761 25.7761 11 25.5 11C24.1453 11 23.127 10.5998 22.3884 9.95107C21.6577 9.30933 21.2423 8.46121 21.0174 7.63071C20.9452 7.36417 21.1027 7.08958 21.3693 7.01739C21.6358 6.9452 21.9104 7.10275 21.9826 7.36929Z" fill="#402A32" />
                </svg>
              </div>
            </div>
          )
          }
        </div>
      </div>

      {/* Upload File Dialog */}
      <Transition appear show={isFilePopupOpen} as={Fragment}>
        <Dialog as='div' initialFocus={changeFocusRef} onClose={closeFilePopup} className={'relative z-10'}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-darkBg/70' />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/3 transform rounded-lg shadow-xl transition-all bg-lightBg dark:bg-darkDropDownBg dark:ring-1 dark:ring-darkContentsBorder">
                  <div className='flex flex-col p-7 space-y-5' ref={changeFocusRef}>
                    <Dialog.Title className={'text-title'}>Upload File</Dialog.Title>

                    {cid ? (
                      <Files cid={cid} />
                    ) : progress > 0 ? (
                      <div className='w-full border-2 border-dashed border-pink01 rounded-lg space-y-4 p-8 flex flex-col'>
                        <Lottie animationData={uploadFileCat} className='w-5/12 place-self-center py-4' />
                        <p className='text-xs'>Uploading...</p>
                        <div className="h-2 rounded-full bg-darkBg/10 dark:bg-lightBg/10">
                          <div className="h-full rounded-full bg-gradient-to-r 
                                          from-lightPink to-pink01
                                          dark:from-darkPink dark:to-pink01" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    ) : (
                      // <DragDrop handleFileChange={(e) => setFileData(e.target.files?.[0] || null)} />
                      <DragDrop handleFileChange={(files) => {
                        const file = Array.isArray(files) ? files[0] : files?.[0];
                        setFileData(file || null);
                    }} />
                      
                    )}

                    <input type="text" placeholder="Enter file name" value={fileName} onChange={(e) => setFileName(e.target.value)}
                      className='outline-none bg-transparent rounded-lg p-3 focus-within:border-pink01
                        border border-lightItemBorder/20 placeholder:text-lightFont/35
                        dark:border dark:border-darkItemBorder/20 placeholder:dark:text-darkFont/35 '/>
                  </div>
                  <div className='flex justify-between px-4 py-3 border-t-1 border-lightContentsBorder dark:border-darkContentsBorder [&>button]:px-7 [&>button]:py-2 [&>button]:rounded-lg'>
                    <button onClick={closeFilePopup} className='hover:bg-darkBg/5 dark:hover:bg-lightBg/5'>Cancel</button>
                    <button onClick={uploadData} className={`${isExistFileName ? 'text-white bg-pink01' : 'text-lightFont/[0.35] bg-darkBg/10 dark:text-darkFont/[0.35] dark:bg-lightBg/10'}`} disabled={!isExistFileName}>Add data</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Create Folder Dialog */}
      <Transition appear show={isFolderPopupOpen} as={Fragment}>
        <Dialog as='div' initialFocus={changeFocusRef} onClose={closeFolderPopup} className={'relative z-10'}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-darkBg/70' />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/3 transform rounded-lg shadow-xl transition-all bg-lightBg dark:bg-darkDropDownBg dark:ring-1 dark:ring-darkContentsBorder">

                  <div className='flex flex-col p-7 space-y-10' ref={changeFocusRef}>
                    <Dialog.Title className={'text-title'}>Create Folder</Dialog.Title>
                    <input type="text" placeholder="Enter folder name" value={folderName} onChange={(e) => setFolderName(e.target.value)}
                      className='outline-none bg-transparent rounded-lg p-3 focus-within:border-pink01
                        border border-lightItemBorder/20 placeholder:text-lightFont/35
                        dark:border dark:border-darkItemBorder/20 placeholder:dark:text-darkFont/35 '/>
                  </div>

                  <div className='flex justify-between px-4 py-3 border-t-1 border-lightContentsBorder dark:border-darkContentsBorder [&>button]:px-7 [&>button]:py-2 [&>button]:rounded-lg'>
                    <button onClick={closeFolderPopup} className='hover:bg-darkBg/5 dark:hover:bg-lightBg/5'>Cancel</button>
                    <button onClick={handleCreateFolder} className={`${isExistFolderName ? 'text-white bg-pink01' : 'text-lightFont/[0.35] bg-darkBg/10 dark:text-darkFont/[0.35] dark:bg-lightBg/10'}`} disabled={!isExistFolderName}>Create Folder</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Share Button Dialog */}
      <Transition appear show={isSharePopupOpen} as={Fragment}>
        <Dialog as='div' initialFocus={changeFocusRef} onClose={closeSharePopup} className={'relative z-10'}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-darkBg/70' />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/3 transform rounded-lg shadow-xl transition-all bg-lightBg dark:bg-darkDropDownBg dark:ring-1 dark:ring-darkContentsBorder">

                  <div className='flex flex-col p-7 space-y-10' ref={changeFocusRef}>
                    <Dialog.Title className={'text-title'}>Keep The Key Secret</Dialog.Title>
                    <div className='flex flex-row justify-between rounded-lg p-3 shadow-dropShadow'>
                      <p>{share_key}</p>
                      <button title='copy to clipboard' type='button' onClick={copyToClipboard} className='hover:text-pink01'><Copy20Regular /></button>
                    </div>
                  </div>

                  <div className='flex justify-center px-4 py-3 border-t-1 border-lightContentsBorder dark:border-darkContentsBorder [&>button]:px-7 [&>button]:py-2 [&>button]:rounded-lg'>
                    <button onClick={closeSharePopup} className="text-white bg-pink01">OK</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  )
};

export default MyBox;