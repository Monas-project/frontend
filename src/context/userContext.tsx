import { createContext, useContext, ReactNode, useState } from 'react';

// ユーザー情報の型
type User = {
  address: string | null; // ウォレットアドレス
};

// UserContextの型
type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

// UserContextの作成
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProviderのプロップスの型
type UserProviderProps = {
  children: ReactNode;
};

// UserProviderコンポーネント
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({ address: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// ユーザー情報を利用するためのカスタムフック
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
