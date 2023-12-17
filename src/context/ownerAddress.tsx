"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Walletの型定義
export interface WalletData {
  address: string;
}

const initialWalletData: WalletData = {
  address: "",
};

// データコンテキストを作成
interface WalletContextType {
  walletData: WalletData | null;
  setWalletData: (data: WalletData | null) => void;
}
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// データプロバイダーコンポーネントを作成
export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletData, setWalletData] = useState<WalletData | null>(initialWalletData); // 初期データを設定

  // // ローカルストレージからデータを読み込む
  // useEffect(() => {
  //   const savedWalletData = localStorage.getItem('walletData');

  //   if (savedWalletData) {
  //     setWalletData(JSON.parse(savedWalletData));
  //   }
  // }, []);

  // // データが更新されたときにローカルストレージに保存する
  // useEffect(() => {
  //   localStorage.setItem('walletData', JSON.stringify(walletData));
  // }, []);

  const contextValue: WalletContextType = {
    walletData,
    setWalletData,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// データを使用するためのカスタムフック
export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
