"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

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
/* const initialData: Metadata = {
  name: "root",
  creation_date: "",
  child: {
    "": {
      cid: "",
      name: "",
      is_directory: true,
    },
  },
};

// データコンテキストを作成
interface DataContextType {
  metaData: Metadata | null;
  setMetaData: (data: Metadata | null) => void;
  root: Metadata | null;
  setRoot: (data: Metadata | null) => void;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

// データプロバイダーコンポーネントを作成
export function DataProvider({ children }: { children: ReactNode }) {
  const [metaData, setMetaData] = useState<Metadata | null>(initialData); // 初期データを設定
  const [root, setRoot] = useState<Metadata | null>(initialData); // 初期データを設定

  const contextValue: DataContextType = {
    metaData,
    setMetaData,
    root,
    setRoot,
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

