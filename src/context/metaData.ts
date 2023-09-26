// import React, { createContext, useContext, ReactNode, useState } from 'react';

// // メタデータの型定義
// interface FileMetadata {
//   cid: string;
//   name: string;
//   is_directory: boolean;
// }

// // ディレクトリメタデータの型定義
// interface DirectoryMetadata {
//   [path: string]: FileMetadata | DirectoryMetadata;
// }

// // データの型定義
// interface Metadata {
//   name: string;
//   creation_date: string;
//   child: DirectoryMetadata;
// }

// // 使用例
// const initialData: Metadata = {
//     name: "root",
//     creation_date: "2023/09/26 11:39:36",
//     child: {
//       "/テスト": {
//         cid: "c69eb57e9596e7f64ad8a628821faf7224bfd9e12276a0787ff3bc889df4b29c",
//         name: "テスト",
//         is_directory: true,
//       },
//     },
// };

// // データコンテキストを作成
// export const DataContext = createContext<{
//     metaData: Metadata | null;
//     setMetaData: (data: Metadata | null) => void;
//     root: Metadata | null;
//     setRoot: (data: Metadata | null) => void;
//   } | undefined>(undefined);

// // データプロバイダーコンポーネントを作成
// // データプロバイダーコンポーネントを作成
// export function DataProvider({ children }: { children: ReactNode }) {
//     const [metaData, setMetaData] = useState<Metadata | null>(initialData); // 初期データを設定
//     const [root, setRoot] = useState<Metadata | null>(initialData); // 初期データを設定
  
//     return (
//       <DataContext.Provider value={{ metaData, setMetaData, root, setRoot }}>
//         {children}
//       </DataContext.Provider>
//     );
//   }

// // データを使用するためのカスタムフック
// export function useData() {
//   const context = useContext(DataContext);
//   if (context === undefined) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// }
