const ENDPOINT = "http://localhost:8000/login";

export type MintTransactionStatus = "pending" | "success" | "failure";

export type MintNftAPIReq = {
  idToken: string;
  nftType:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16";
};

export type MintNftAPIRes = {
  id: string;
  status: MintTransactionStatus;
  error: boolean;
};

export const mintNft = async (req: MintNftAPIReq) => {
  const body = JSON.stringify(req);
  const res = await fetch(ENDPOINT, { method: "POST", body });
  return (await res.json()) as MintNftAPIRes;
};
