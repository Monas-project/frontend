import axios, { isAxiosError } from "axios";
import constants from "src/constants";

const OPEN_BADGE_BUCKET_NAME = process.env.NEXT_PUBLIC_OPEN_BADGE_BUCKET_NAME;

/**
 */
export const axiosOpenBadge = axios.create({
  baseURL: `${constants.CLOUD_STORAGE_API}/${OPEN_BADGE_BUCKET_NAME}`,
});

// eslint-disable-next-line func-style
export async function getOpenBadgeJson(params: {
  type: "badge-class" | "issuer-organization" | "issue-badge";
  tokenId?: number;
}) {
  console.log("OPEN_BADGE_BUCKET_NAME : ", OPEN_BADGE_BUCKET_NAME);
  console.log("constants.CLOUD_STORAGE_API: ", constants.CLOUD_STORAGE_API);
  console.log("関数の中入りました。");
  const filename = (() => {
    switch (params.type) {
      case "badge-class":
        return `badge-class.json`;
      case "issuer-organization":
        return `issuer-organization.json`;
      case "issue-badge":
        if (!params.tokenId === undefined) {
          throw new Error("tokenId is required");
        }
        return `issue-badge-${params.tokenId}.json`;
      default:
        throw new Error("invalid type");
    }
  })();
  try {
    console.log("filename", filename);
    console.log("axiosOpenBadge", axiosOpenBadge.get);
    const response = await axiosOpenBadge.get(filename);
    console.log("response.data", response.data);
    return response.data;
  } catch (e) {
    if (isAxiosError(e)) {
      return e.response;
    }
    throw e;
  }
}
