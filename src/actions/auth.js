const SOLANA = require("@solana/web3.js");
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;

export const getProvider = () => {
  try {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana;
      if (provider.isPhantom) return { status: true, data: provider };
    } else {
      return { status: false, error: "Phantom wallet not installed" };
    }
  } catch (err) {
    return { status: false, error: err };
  }
};
