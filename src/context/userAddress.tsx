"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

// データコンテキストを作成
interface UserContextType {
  user: string | null;
  setUser: (value: string | null) => void;
  sign: string | null;
  setSign: (value: string | null) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

// データプロバイダーコンポーネントを作成
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null); // 正しい初期データを設定
  const [sign, setSign] = useState<string | null>(null); // 正しい初期データを設定

  const contextValue: UserContextType = {
    user,
    setUser,
    sign,
    setSign
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// データを使用するためのカスタムフック
export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

