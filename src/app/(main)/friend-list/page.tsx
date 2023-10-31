"use client";
import { Searchbar } from '@/components/search/searchbar';
import {
  Grid16Filled,
  CaretDown12Filled,

  DocumentText24Filled,
  Image24Filled,
  DocumentPdf24Filled,
  Video24Filled,
  Folder24Filled,
  FolderZip24Filled,

  ArrowDownload16Regular,
  Share16Regular,
  Delete16Regular,
  Key16Regular,
} from '@fluentui/react-icons';


const FriendList = () => {

  const filterTypeContents = [
    { name: 'documents', icon: <DocumentText24Filled /> },
    { name: 'Photos & images', icon: < Image24Filled /> },
    { name: 'PDFs', icon: <DocumentPdf24Filled /> },
    { name: 'Videos', icon: <Video24Filled /> },
    { name: 'Folders', icon: <Folder24Filled /> },
    { name: 'Archives', icon: <FolderZip24Filled /> },
  ];

  const fileTableTr = [
    { key: 'folder', th: '', width: '0%' },
    { key: 'name', th: 'Name', width: '63.7%' },
    { key: 'Shared by', th: 'Shared by', width: '12%' },
    { key: 'Shared data', th: 'Shared data', width: '13.7%' },
    { key: 'action', th: '', width: '10.6%' },
  ];
  const fileTableAction = [
    { icon: <ArrowDownload16Regular />, alt: 'Download', onclick: '' },
    { icon: <Share16Regular />, alt: 'Share', onclick: '' },
    { icon: <Delete16Regular />, alt: 'Delete', onclick: '' },
    { icon: <Key16Regular />, alt: 're-encryt', onclick: '' },
  ];

  const dataList = [
    { name: "太郎", address: "0x23...178", sharingFile: "A" },
    { name: "花子", address: "0x56...998", sharingFile: "D" },
    { name: "次郎", address: "0x72...211", sharingFile: "B" },
    { name: "三郎", address: "0x19...591", sharingFile: "C" },
    { name: "四郎", address: "0x98...612", sharingFile: "A" },
  ];
  return (

    <div className='h-full flex flex-col'>
      {/* コンテンツ上部 */}
      <div className='sticky top-0'>
        <Searchbar />
        <div className='border-b-1 px-9 py-4 space-y-3
                      border-lightContentsBorder 
                      dark:border-darkContentsBorder'>
          <div className='flex flex-rows items-center justify-between'>
            <h1 className='text-folderTitle'>Friend List</h1>
            <button title='gridOrList' type='button'><Grid16Filled /></button>
          </div>
        </div>


      </div>

      {/* 本体 */}
      <div className='h-full box-border p-5 overflow-hidden overflow-y-scroll'>

        {/* ファイル用テーブル */}
        <div className='grow text-left font'>
          {dataList.length > 0 ? (
            <table className='table-fixed w-full'>
              <thead>
                <tr>{fileTableTr.map((x) => (
                  <th key={x.key} style={{ width: x.width }} className='py-1.5 first:absolute [&:nth-child(2)]:pl-7 last:pr-7 font-normal text-tableTh'>
                    {x.th}
                  </th>
                ))}</tr>
              </thead>

              <tbody>
                {dataList.map((item, index) => (
                  <tr key={index}
                    className='group border-y hover:outline hover:outline-1 hover:outline-pink01 relative
                    border-y-lightTableBorder hover:bg-lightHoverTrBg
                    dark:border-y-darkTableBorder dark:hover:bg-darkHoverTrBg
                    [&_td]:pr-3 [&_td]:py-[0.797rem] [&_td]:truncate'>

                    {/* File,Folder */}
                    <td className='absolute' style={{ overflow: 'visible', paddingTop: "0.48rem", paddingLeft: '1.75rem'/* 28px - 表題と同じ*/ }}>
                        <button aria-label={'folder' + index} type='button' /* onClick={() => nextData(path)} */ className='text-folder pt-[0.18rem]'>
                          <Folder24Filled />
                        </button>
                    </td>

                    {/* Name */}
                    <td className='pl-20'>{item.name}</td>

                    {/* Shared By */}
                    <td>{item.owner}</td>

                    {/* Share date */}
                    <td>{item.dataModified}</td>

                    {/* action */}
                    <td className='pr-7 text-center space-x-3.5' style={{ paddingTop: "0.5rem", paddingRight: '1.75rem'/* 28px - 表題と同じ*/ }}>
                      {fileTableAction.map((contents) => (
                        <button key={contents.alt} className='invisible group-hover:visible' /*onClick */>
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
          )}
        </div>
      </div>
    </div>
    


    /* <div>
      <h1 className="text-4xl font-bold text-center">Friend List</h1>
      <h1>Friend List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Shareing file</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.address}</td>
              <td className="border px-4 py-2">{item.sharingFile}</td>
              <td className="border px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */
  )
}
export default FriendList;