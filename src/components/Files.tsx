import React from "react";
import {
  CheckmarkCircle24Filled,
  CaretRight20Filled,
} from '@fluentui/react-icons';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL
  ? process.env.NEXT_PUBLIC_GATEWAY_URL
  : "https://gateway.pinata.cloud";

export default function Files(props: any) {
  return (
    <div className="file-viewer shadow-dropShadow rounded-lg space-x-5 flex flex-row justify-start items-center p-5">

      <div className="text-pink01 [&>svg]:w-10 [&>svg]:h-10"><CheckmarkCircle24Filled /></div>
      <div className="flex flex-col w-full space-y-2">
        <div className="space-y-1">
          <p>Your IPFS CID:</p>
          <p className="text-14 ml-2">{props.cid}</p>
        </div>
        <div className="w-fit place-self-end flex flex-col place-items-center group">
          <a
            href={`${GATEWAY_URL}/ipfs/${props.cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`}
            rel="noopener noreferrer"
            target="_blank"
            className="text-pink01 text-xs flex flex-row items-center space-x-1 pl-2.5"
          >
            <p className="text-xs">View file</p>
            <CaretRight20Filled className="" />
          </a>
          <div className="bg-pink01 h-px w-full place-self-start scale-x-0 transition origin-left group-hover:scale-x-100" />
        </div>
      </div>
    </div>
  );
}
