const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = `${API_URL}/login`;

export type loginAPIReq = {
  cid: string;
  root_key: string;
};

export type loginAPIRes = {
  res: any;
  // error: boolean;
};

export const login = async (rootId: string, rootKey: string) => {
  const req: loginAPIReq = {
    "cid": rootId,
    "root_key": rootKey,
  };
  const body = JSON.stringify(req);
  console.log("login body: ", body)
  const res = await fetch(ENDPOINT, { method: "POST", headers: {
    'Content-Type': 'application/json'
  }, body: body });

  // ストリームからデータを読み取る
  const responseBody = await res.json(); // もしくは await res.json() など、適切なメソッドを使用
  console.log("Login Response body", responseBody);
  
  // エスケープを解除し、JSON形式のデータとして解釈する
  try {
    // const decodedBody = JSON.parse(responseBody.replace(/\\\"/g, '"')); // エスケープを解除
    // console.log("Decoded response body", responseBody);
    return responseBody as loginAPIRes;
  } catch (error) {
    // パースに失敗した場合のエラーハンドリング
    console.error("Failed to parse JSON response:", error);
    return null; // またはエラー処理を行う
  }
};

