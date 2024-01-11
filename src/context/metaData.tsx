"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// メタデータの型定義
export interface FileMetadata {
  cid: string;
  name: string;
  is_directory: boolean;
}

// ディレクトリメタデータの型定義
export interface DirectoryMetadata {
  [path: string]: FileMetadata | DirectoryMetadata;
}

// データの型定義
export interface Metadata {
  name: string;
  creation_date: string;
  child: DirectoryMetadata;
}

// 使用例
// const initialData: Metadata = {
//   name: "root",
//   creation_date: "",
//   child: {
//     "": {
//       cid: "",
//       name: "",
//       is_directory: true,
//     },
//   },
// };

// データコンテキストを作成
interface DataContextType {
  metaData: Metadata | null;
  setMetaData: (data: Metadata | null) => void;
  root: Metadata | null;
  setRoot: (data: Metadata | null) => void;
  currentNode: Metadata | null;
  setCurrentNode: (data: Metadata | null) => void;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

// データプロバイダーコンポーネントを作成
export function DataProvider({ children }: { children: ReactNode }) {
  const [metaData, setMetaData] = useState<Metadata | null>(); // 初期データを設定
  const [root, setRoot] = useState<Metadata | null>(); // 初期データを設定
  const [currentNode, setCurrentNode] = useState<Metadata | null>(); // 初期データを設定

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const savedMetaData = localStorage.getItem('metaData');
    const savedRoot = localStorage.getItem('root');
    const savedCurrentNode = localStorage.getItem('currentNode');

    if (savedMetaData && savedMetaData !== "undefined") {
      setMetaData(JSON.parse(savedMetaData));
    }
    if (savedRoot && savedRoot !== "undefined") {
      setRoot(JSON.parse(savedRoot));
    }
    if (savedCurrentNode && savedCurrentNode !== "undefined") {
      setCurrentNode(JSON.parse(savedCurrentNode));
    }
  }, []);

  // データが更新されたときにローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem('metaData', JSON.stringify(metaData));
    localStorage.setItem('root', JSON.stringify(root));
    localStorage.setItem('currentNode', JSON.stringify(currentNode));
  }, [metaData, root, currentNode]);

  const contextValue: DataContextType = {
    metaData,
    setMetaData,
    root,
    setRoot,
    currentNode,
    setCurrentNode,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// データを使用するためのカスタムフック
export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

