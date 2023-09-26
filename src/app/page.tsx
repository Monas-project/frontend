"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import detectEthereumProvider from '@metamask/detect-provider';
import { signup } from "../utils/api/signup";
import { login } from "../utils/api/login";
// import { useData, DataProvider } from "@/context/metaData";


export default function Home() {
  const [connecting, setConnecting] = useState<boolean>(false); // connectingの型を指定
  const router = useRouter();

  const connectWallet = async () => {
    setConnecting(true);

    try {
      const provider = await detectEthereumProvider() as any;

      if (!provider) {
        throw new Error('Please install MetaMask!');
      }

      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      }) as string[]; // accountsの型を指定

      if (accounts.length > 0) {
        console.log(accounts[0]);
      }

      const data: any = await signup();
      const rootId = data[0];
      const root_key = data[1];
      console.log("cid:", data[0]);
      console.log("root_key:", data[1]);
      if(!rootId) {
        return;
      }
      
    } catch (err: any) {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    } finally {
      setConnecting(false);
    }
  };

  // Login
  const [rootId, setRootId] = useState('');
  const [rootKey, setRootKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'rootId') {
      setRootId(value);
    } else if (name === 'rootKey') {
      setRootKey(value);
    }
  };

  const handleLogin = async (event: any) => {
    // デフォルトのフォーム送信処理をキャンセル
    event.preventDefault();
    console.log('rootId:', rootId);
    console.log('rootKey:', rootKey);

    // ログイン処理を実行
    try {
      const data: any = await login(rootId, rootKey);
      console.log("metadata", data.metadata);
      setIsLoggedIn(true);
      router.push(`/my-box?cid=${rootId}`);
    } catch (error) {
      console.error('Login error:', error);
    }
  };



  return (
    // <DataProvider>
    <div className="bg-gray-900 h-screen flex flex-col justify-center items-center text-white font-semibold">
  <h1 className="text-6xl mb-8">Monas</h1>
  <p className="text-2xl mb-12 text-center">
    Lets connect to the next generation data store.<br />
    Enjoy it!
  </p>
  <button
    onClick={connectWallet}
    className="rounded-full text-xl px-8 py-2 bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out"
    disabled={connecting}
  >
    {connecting ? 'Connecting...' : 'Connect Wallet'}
  </button>
  <div className="mt-16 max-w-md mx-auto">
    <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rootId">
          Root ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rootId"
          name="rootId"
          type="text"
          placeholder="Your Root ID"
          value={rootId}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rootKey">
          Root Key
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rootKey"
          name="rootKey"
          type="password"
          placeholder="Your Root Key"
          value={rootKey}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          type="submit"
        >
          {isLoggedIn ? 'Logged In' : 'Log In'}
        </button>
      </div>
    </form>
  </div>
</div>
// </DataProvider>

  );
}
