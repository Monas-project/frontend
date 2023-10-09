import PinataClient from "@pinata/sdk";

async function main() {
  const pinata = new PinataClient({
    pinataApiKey: process.env.PINATA_API_KEY!,
    pinataSecretApiKey: process.env.PINATA_API_SECRET!,
  });

  const { authenticated } = await pinata.testAuthentication();

  console.log(JSON.stringify({ authenticated }, null, 2));
}

main().catch((err) => console.error(err));