const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = `${API_URL}/decrypt`;

export type decryptAPIReq = {
  data: string;
  key: string;
};

export type decryptAPIRes = {
  res: any;
  // error: boolean;
};

export const decrypt = async (data: string, key: string) => {
  const req: decryptAPIReq = {
    "data": data,
    "key": key,
  };
  
  const body = JSON.stringify(req);
  console.log("decrypt body: ", body)
  const res = await fetch(ENDPOINT, { method: "POST", headers: {
    'Content-Type': 'application/json'
  }, body: body });

  // ストリームからデータを読み取る
  const responseBody: any = await res.json(); // もしくは await res.json() など、適切なメソッドを使用
  console.log("Decrypt Response body", responseBody);
  
  // エスケープを解除し、JSON形式のデータとして解釈する
  try {
    // const decodedBody = JSON.parse(responseBody.replace(/\\\"/g, '"')); // エスケープを解除
    // console.log("Decoded response body", responseBody);
    return responseBody as decryptAPIRes;
  } catch (error) {
    // パースに失敗した場合のエラーハンドリング
    console.error("Failed to parse JSON response:", error);
    return null; // またはエラー処理を行う
  }
};

