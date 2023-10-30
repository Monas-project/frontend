import { ethers } from "ethers";
import contract_json from "../../context/FileHashRegistry.json";
import { config } from "dotenv";
config();

const privateKeyFromEnv = process.env.PRIVATE_KEY;
console.log("privateKeyFromEnv", privateKeyFromEnv);
if (!privateKeyFromEnv) {
    throw new Error("PRIVATE_KEY is not defined in the environment variables.");
}

// ネットワークの設定
const NETWORK_CONFIG = {
    chainId: 314159,
    // url: "https://api.calibration.node.glif.io/rpc/v1",
    url: "https://rpc.ankr.com/filecoin_testnet",
    privateKey: privateKeyFromEnv,
};

// コントラクトのアドレスとABIを設定
const contractAddress = "0x6793C1992B104B69cce0c5EC81d26E7DBac4746F"; // デプロイされたFileHashRegistryコントラクトのアドレス
const abi = contract_json.abi;
// console.log("abi", abi);

export async function registerFileHash(fileHash: string) {
    // const provider = new ethers.BrowserProvider((window as any).ethereum);
    // const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    // const provider = new ethers.JsonRpcProvider('https://api.calibration.node.glif.io/rpc/v1');
    // console.log("provider", provider)
    const provider = new ethers.JsonRpcProvider(
        "https://rpc.ankr.com/filecoin_testnet"
    );
    console.log("provider", provider);
    const wallet = new ethers.Wallet(NETWORK_CONFIG.privateKey, provider);
    console.log("wallet", wallet);
    // const signer = await provider.getSigner();
    // const walletAddress: any = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const tx = await contract.registerHash(fileHash);
    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
}

export async function verifyFileHash(userAddress: string, fileHash: string) {
    const provider = new ethers.JsonRpcProvider(
        "https://rpc.ankr.com/filecoin_testnet"
    );
    console.log("provider", provider);
    const wallet = new ethers.Wallet(NETWORK_CONFIG.privateKey, provider);
    console.log("wallet", wallet);
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const result = await contract.verifyHash(userAddress, fileHash);
    console.log("Hash verification result:", result);
}

if (process.argv[2] === "register") {
    const hashValue = process.argv[3];
    if (!hashValue) {
        console.error("Please provide a hash value as an argument.");
        process.exit(1);
    }

    registerFileHash(hashValue)
        .then(() => {
            console.log("Hash registered successfully!");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Error registering hash:", error);
            process.exit(1);
        });
}

if (process.argv[2] === "verify") {
    const userAddress = process.argv[3];
    const hashValue = process.argv[4];
    if (!userAddress) {
        console.error("Please provide a user address as first argument.");
        process.exit(1);
    }
    if (!hashValue) {
        console.error("Please provide a hash value as second argument.");
        process.exit(1);
    }

    verifyFileHash(userAddress, hashValue)
        .then(() => {
            console.log("Verify successfully!");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Error registering hash:", error);
            process.exit(1);
        });
}

// 使用例
// registerFileHash('0x...'); // ハッシュ値を引数に指定
// verifyFileHash('0xUserAddress', '0xFileHash'); // ユーザーアドレスとハッシュ値を引数に指定