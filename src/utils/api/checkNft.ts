const ENDPOINT = "/api/checkNft";

export type CheckNftAPIReq = {
  idToken: string;
};

export type CheckNftAPIRes = {
  nftId: number;
  error: boolean;
};

export const checkNft = async (req: CheckNftAPIReq) => {
  const body = JSON.stringify(req);
  const res = await fetch(ENDPOINT, { method: "POST", body });
  return (await res.json()) as CheckNftAPIRes;
};
