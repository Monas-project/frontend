// import formidable from "formidable";
const formidable = require("formidable");
import { NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next'
// import fs from "fs";
const fs = require("fs");
import FormData from "form-data";
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT });

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: any) => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options = {
      pinataMetadata: {
        name: file.originalFilename,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);
    console.log("api-response: ", response);

    return response;
  } catch (error) {
    throw error;
  }
};

export async function POST(req: Request ,res: NextResponse) {
  console.log("req.method", req.method);
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async function (err: any, fields: any, files: any) {
        if (err) {
          console.log({ err });
          return res.status(500).send("Upload Error");
        }
        // const filePath =files.file.path;
        const response = await saveFile(files.file);
        const { IpfsHash } = response;

        return res.send(IpfsHash);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  } else if (req.method === "GET") {
    try {
      const response = await pinata.pinList(
        { pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT },
        {
          pageLimit: 1,
        }
      );
      res.json(response.rows[0]);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
}
