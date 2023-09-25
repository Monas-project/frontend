const ENDPOINT = "/api/check/projectApproval";

export type Req = {
  mail: string;
  tokenId: string;
};

export type Res = {
  result: boolean;
  error: boolean;
}

export const checkProjectApproval = async ({ mail, tokenId }: Req) => {
  const jsonBody = {
    mail: mail,
    tokenId: tokenId
  }

  const body = JSON.stringify(jsonBody)
  const res = await fetch(ENDPOINT, { method: "POST", body })
  return await res.json() as Res;
};
