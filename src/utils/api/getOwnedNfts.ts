const ENDPOINT = "/api/getOwnedNfts";

export type getOwnedNftsReq = {
  idToken: string;
};

export type getOwnedNftsRes = {
  data: any[];
  isLoading: any;
  error: any;
};

export const getOwnedNfts = async (req: getOwnedNftsReq) => {
  const body = JSON.stringify(req);
  console.log("client body: ", body);
  const res = await fetch(ENDPOINT, { method: "POST", body });
  return (await res.json()) as getOwnedNftsRes;
};
