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
    // <DataProvider>
    <div className='bg-cover h-screen w-screen flex flex-col justify-center font-SegoeUI font-semibold
                    bg-homeBgLight text-lightFont
                    dark:bg-homeBgDark dark:text-darkFont'>
      <div className='w-2/5 h-3/5 m-3.5 sm:w-full'>

        <div className='w-full'>
          <h1 className='text-h1'>Welcme to Monas<span className='text-pink01'>.</span></h1>
          <h2 className='text-h2 font-normal'>Give you the power of data and<br />the future is yours to decide!</h2>
        </div>

        <div>
          <button className='w-54 py-buttonPy rounded-full bg-pink01 text-white hover:bg-pink01Hover transition duration-300 ease-in-out'
            onClick={connectWallet}
            disabled={connecting}>
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>

        <div className='w-54'>

          <div className='w-full justify-center items-center inline-flex space-x-3'>
            <div className='h-px grow bg-lightFont'></div>
            <div className='mx-3.5%'>or</div>
            <div className='h-px grow bg-lightFont'></div>

          </div>

          <p>Already have an account?</p>

          <div>

            <form onSubmit={handleLogin} className=''>

              <label htmlFor='rootId'
                className='relative block rounded-lg border-4 border-transparent
                                bg-lightInputBg focus-within:border-lightInputOutline 
                                dark:bg-darkInputBg dark:focus-within:border-darkInputOutline'>
                <input id='rootId' name='rootId' type='text' value={rootId} onChange={handleInputChange} placeholder=''
                  className='px-inputPx pt-inputPt pb-inputPb rounded-lg bg-inherit outline-none border border-transparent w-full h-full
                            focus-within:border-pink01
                            focus-within:bg-lightInputActiveBg
                            dark:focus-within:bg-darkInputActiveBg' />
                <span dir='Itr'
                  className=' absolute left-placefolderL top-placefolderT whitespace-nowrap transition-all duration-200
                              text-lightInputFont
                              dark:text-darkInputFont'>
                  Root ID
                </span>
              </label>

              <label htmlFor='rootKey'
                className='relative block rounded-lg border-4 border-transparent
                          bg-lightInputBg focus-within:border-lightInputOutline 
                          dark:bg-darkInputBg dark:focus-within:border-darkInputOutline'>
                <input id='rootKey' name='rootKey' type='password' value={rootKey} onChange={handleInputChange} placeholder=''
                  className='px-inputPx pt-inputPt pb-inputPb rounded-lg bg-inherit outline-none border border-transparent w-full h-full
                            focus-within:border-pink01
                            focus-within:bg-lightInputActiveBg
                            dark:focus-within:bg-darkInputActiveBg' />
                <span dir='Itr'
                  className=' absolute left-placefolderL top-placefolderT whitespace-nowrap transition-all duration-200
                              text-lightInputFont
                              dark:text-darkInputFont'>
                  Root Key
                </span>
              </label>

            </form>

          </div>

          <div>
            <button type='submit'
              className='text-pink01 w-full border rounded-full py-buttonPy hover:bg-pink02 transition
                              bg-lightBg border-lightBorder
                              dark:bg-darkBg dark:border-darkBorder'>
              {isLoggedIn ? 'Logged In' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>

    /*     <div className="bg-titleBg bg-cover h-screen w-screen flex flex-col justify-center text-black01 font-SegoeUI font-semibold">
          <div className='w-1/2 h-4/5 grid grid-auto-rows-auto gap-6% p-3.5%'>
            <div>
              <h1 className=" text-h1">Welcome to Monas</h1>
              <h2 className=" text-h2">
                Give you the power of data and<br />
                the future is yours to decide!
              </h2>
            </div>
            <button className="py-2 w-1/2 text-button text-white bg-pink01 rounded-full hover:bg-pink01Hover transition duration-300 ease-in-out"
              onClick={connectWallet}
              disabled={connecting}
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
    
            <div className='w-1/2 justify-center items-center inline-flex'>
              <div className="h-px grow bg-black01"></div>
              <div className='mx-3.5%'><span>or</span></div>
              <div className="h-px grow bg-black01"></div>
            </div>
    
    
            <div className=" w-1/2 space-y-6%">
              <p className=''>Already have an account?</p>
              <form onSubmit={handleLogin} className="space-y-6%">
                <div className="space-y-4%">
                  <label className="relative block p-3.5% text-label text-gray01 bg-white border rounded border-gray01 focus-within:border-pink01" htmlFor="rootId">
                    <input
                      className="outline-none pt-3.5% focus:border-pink01 w-full text-black01"
                      id="rootId"
                      name="rootId"
                      type="text"
                      value={rootId}
                      onChange={handleInputChange}
                      placeholder=" "
                    />
                    <span dir='Itr' className='absolute left-4% top-30% text-gray01 transition-all duration-300 pointer-events-none whitespace-nowrap'>Root ID</span>
                  </label>
    
                  <label className="relative block p-3.5% text-label text-gray01 bg-white border rounded border-gray01 focus-within:border-pink01" htmlFor="rootId">
                    <input
                      className="outline-none pt-3.5% focus:border-pink01 w-full text-black01"
                      id="rootKey"
                      name="rootKey"
                      type="password"
                      value={rootKey}
                      onChange={handleInputChange}
                      placeholder=" "
                    />
                    <span dir='Itr' className='absolute left-4% top-30% text-gray01 transition-all duration-300 pointer-events-none whitespace-nowrap'>Root Key</span>
                  </label>
                </div>
    
                <button className="py-2 w-full text-button text-pink01 bg-white border rounded-full border-pink01 hover:bg-pink02 transition duration-300 ease-in-out"
                  type="submit"
                >
                  {isLoggedIn ? 'Logged In' : 'Log In'}
                </button>
              </form>
            </div>
          </div>
        </div> */
    // </DataProvider>

  );
}