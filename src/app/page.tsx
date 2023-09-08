"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import detectEthereumProvider from '@metamask/detect-provider';

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
        router.push('/my-box');
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

  return (
    <div className="bg-indexBG bg-cover h-screen w-screen flex flex-col place-content-center text-lightBlack font-aktivGrotesk">
      <div className='ml-36'>
        <h1 className="text-7xl">Monas</h1>
        <p className="text-2xl mt-83px mb-97px">Let's connect next generation data store.<br></br>
          Enjoy it!</p>
        <div>
          <button
            onClick={connectWallet}
            className="rounded-full text-2xl px-10 py-2.5 bg-blue-300 hover:bg-blue-700 text-white"
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
}
