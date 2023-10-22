"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import detectEthereumProvider from '@metamask/detect-provider';
import { signup } from "../../utils/api/signup";
import { login } from "../../utils/api/login";
import { useDataContext } from "@/context/metaData";

export default function Home() {
  const [connecting, setConnecting] = useState<boolean>(false);
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
      }) as string[];

      if (accounts.length > 0) {
        console.log(accounts[0]);
      }

      const data: any = await signup();
      const rootId = data[0];
      const root_key = data[1];
      if (!rootId) {
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

  const [rootId, setRootId] = useState('');
  const [rootKey, setRootKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setRoot } = useDataContext();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'rootId') {
      setRootId(value);
    } else if (name === 'rootKey') {
      setRootKey(value);
    }
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    console.log('rootId:', rootId);
    console.log('rootKey:', rootKey);

    try {
      const data: any = await login(rootId, rootKey);
      console.log("metadata", data.metadata);
      setRoot(data.metadata);
      setIsLoggedIn(true);
      router.push(`/my-box`);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='h-screen w-screen bg-cover font-semibold
                    bg-homeBgLight
                    dark:bg-homeBgDark'>

      <div className='absolute top-7 left-7'>
        <svg xmlns="http://www.w3.org/2000/svg" className='h-logoType w-auto fill-pink01' viewBox="0 0 893.9 236.87">
          <use xlinkHref="/logoType.svg#logoType" />
        </svg>
      </div>

      <div className='absolute bottom-7 right-7'>
        <svg xmlns="http://www.w3.org/2000/svg" className='h-logoMark w-auto fill-white' viewBox="0 0 338.9 335.4">
          <use xlinkHref="/logoMark.svg#logoMark" />
        </svg>
      </div>
      
      <div className='w-1/2 h-full flex justify-center'>
        <div className='space-y-60.8 w-auto flex flex-col justify-center'>
          <div className='space-y-5'>
            <h1 className='text-h1'>Welcome to Monas<span className='text-pink01 text-8xl'>&#46;</span></h1>
            <h2 className='font-normal text-h2'>Give you the power of data and <br />the future is yours to decide!</h2>
          </div>

          <button onClick={connectWallet} disabled={connecting}
            className='w-299.2 py-2.5 text-white text-base bg-pink01 rounded-full'
          >
            {connecting ? 'Connecting...' : 'Sign up'}
          </button>

          <div className='w-299.2 space-x-2.5 flex items-center'>
            <div className='h-px w-full
                            bg-lightFont
                            dark:bg-darkFont'></div>
            <div className='font-normal text-base'>or</div>
            <div className='h-px w-full
                            bg-lightFont
                            dark:bg-darkFont'></div>
          </div>

          <div className='space-y-10'>
            <p>Already have an account?</p>
            <button type="submit"
              className='w-299.2 py-2.5 text-pink01 text-base rounded-full border
                        border-lightLoginBtnBorder
                        dark:border-darkContentsBorder'
            >
              {isLoggedIn ? 'Logged In' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}