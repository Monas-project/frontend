const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = `${API_URL}/upload`;

export type uploadAPIReq = {
  name: string;
  id: string;
  path: string;
  isDirectory: boolean;
  data: string;
};

export type uploadAPIRes = {
  res: any;
  // error: boolean;
};

export const uploadFolderAPI = async (request: uploadAPIReq) => {
  const req: uploadAPIReq = {
    name: request.name,
    id: request.id,
    path: request.path,
    isDirectory: request.isDirectory,
    data: request.data,
  };
  const body = JSON.stringify(req);
  console.log("Upload body: ", body);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  // ストリームからデータを読み取る
  const responseBody = await res.json(); // もしくは await res.json() など、適切なメソッドを使用
  console.log("Upload Response body", responseBody);

  // エスケープを解除し、JSON形式のデータとして解釈する
  try {
    // const decodedBody = JSON.parse(responseBody.replace(/\\\"/g, '"')); // エスケープを解除
    // console.log("Decoded response body", responseBody);
    return responseBody as uploadAPIRes;
  } catch (error) {
    // パースに失敗した場合のエラーハンドリング
    console.error("Failed to parse JSON response:", error);
    return null; // またはエラー処理を行う
  }
};
