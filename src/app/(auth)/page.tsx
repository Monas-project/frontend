"use client";
// interface Window {
//   ethereum: any;
// }
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { signup } from "../../utils/api/signup";
import { login } from "../../utils/api/login";
import { useDataContext } from "@/context/metaData";
import { useWalletContext } from "@/context/ownerAddress";

export default function Home() {
  const [connecting, setConnecting] = useState<boolean>(false);
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [rootId, setRootId] = useState('');
  const [rootKey, setRootKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setRoot } = useDataContext();
  const { setWalletData } = useWalletContext();

  const connectWallet = async () => {
    setConnecting(true);
    if (typeof (window as any).ethereum === 'undefined') {
      console.error("Please install MetaMask");
      setConnecting(false);
      return;
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const message = "Please sign this message to log in.";
    const signature = await signer.signMessage(message);
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
    setWalletData({ address: walletAddress });

    const response: any = await signup(walletAddress, signature);

    // const data = await response.json();
    if (response.access_token) {
      // Save the JWT for future requests
      localStorage.setItem("token", response.access_token);
      console.log("localStorage.getItem", localStorage.getItem("token"))
      setIsSignedIn(true);
      // await handleLogin();
    } else {
      // Authentication failed
      console.log("Authentication failed")
    }
    setConnecting(false);
  };



  // const handleInputChange = (event: any) => {
  //   const { name, value } = event.target;
  //   if (name === 'rootId') {
  //     setRootId(value);
  //   } else if (name === 'rootKey') {
  //     setRootKey(value);
  //   }
  // };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (!address) {
      return;
    }
    console.log('rootId:', rootId);
    console.log('rootKey:', rootKey);

    try {
      // const data: any = await login(rootId, rootKey);
      const data: any = await login(address);
      console.log("data", data);
      console.log("metadata", data.metadata);
      localStorage.setItem('walletAddree', address)
      setRoot(data.metadata);
      setIsLoggedIn(true);
      router.push(`/my-box`);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='h-screen w-screen bg-cover font-semibold bg-center xl:bg-left
                    bg-homeBgLight
                    dark:bg-homeBgDark'>
      {/* Logotype */}
      <div className='absolute top-7 left-7'>
        <svg xmlns="http://www.w3.org/2000/svg" className='h-logoType w-auto fill-pink01' viewBox="0 0 893.9 236.87">
          <use xlinkHref="/logoType.svg#logoType" />
        </svg>
      </div>

      {/* Logomark */}
      <div className='absolute bottom-7 right-7 lg:inset-x-0 lg:bottm-1 lg:flex lg:place-content-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className='h-logoMark w-auto fill-white xl:fill-pink01 xl:h-16 lg:h-10' viewBox="0 0 338.9 335.4">
          <use xlinkHref="/logoMark.svg#logoMark" />
        </svg>
      </div>

      <div className='w-1/2 h-full flex justify-center
                      lg:w-full xl:w-9/12'>
        <div className='space-y-60.8 w-auto flex flex-col justify-center 
                        lg:text-center lg:place-items-center lg:[&>div]:w-full lg:[&_button]:w-3/4'>
          <div className='space-y-5'>
            <h1 className='text-h1'>Welcome to Monas<span className='text-pink01 text-8xl'>&#46;</span></h1>
            <h2 className='font-normal text-h2'>Give you the power of data and <br />the future is yours to decide!</h2>
          </div>

          <div className='w-full'>
            <button onClick={connectWallet} disabled={connecting}
              className='w-299.2 py-2.5 text-white text-base bg-pink01 rounded-full'
            >
              {isSignedIn ? 'Connected' : (connecting ? 'Connecting...' : 'Connect Wallet')}
            </button>
          </div>

          <div className='w-299.2 space-x-2.5 flex items-center lg:px-8'>
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
            <button onClick={handleLogin} type="submit"
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