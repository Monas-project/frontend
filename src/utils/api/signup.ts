const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = `${API_URL}/signup`;

export type signupAPIReq = {
  address: string;
  // signature: string;
};

export type signupAPIRes = {
  res: any;
  // error: boolean;
};

export const signup = async (address: string) => {
  const req: signupAPIReq = {
    address,
    // signature,
  };
  const body = JSON.stringify(req);
  console.log("ENDPOINT", ENDPOINT);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  // console.log("res.body", res.body);
  // return (await res.json()) as signupAPIRes;

  // ストリームからデータを読み取る
  const responseBody = await res.text(); // もしくは await res.json() など、適切なメソッドを使用
  // const responseBody = await res.json(); // もしくは await res.json() など、適切なメソッドを使用

  console.log("Response body", responseBody);

  // JSON形式のデータとして解釈する
  try {
    const data = JSON.parse(responseBody);
    console.log("return data", data);
    return data as signupAPIRes;
  } catch (error) {
    // パースに失敗した場合のエラーハンドリング
    console.error("Failed to parse JSON response:", error);
    return null; // またはエラー処理を行う
  }
};
