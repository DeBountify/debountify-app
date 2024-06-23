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

export const connectWallet = async () => {
  // @ts-ignore
  const { solana } = window;

  if (solana) {
    try {
      const response = await solana.connect();
      return {
        status: true,
        data: { walletAddress: response.publicKey.toString() },
      };
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
      return { status: false, error: err };
    }
  }
};

export const checkbalance = async (walletKey) => {
  try {
    const QUICKNODE_RPC = process.env.SOLANA_URL || clusterApiUrl("devnet");
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    if (!walletKey) throw new Error("Wallet not connected");
    let balance = await SOLANA_CONNECTION.getBalance(new PublicKey(walletKey));
    return { status: true, data: balance / LAMPORTS_PER_SOL };
  } catch (err) {
    return { status: false, error: err };
  }
};

export const disconnectWallet = async () => {
  try {
    const { solana } = window;

    if (walletKey && solana) {
      await solana.disconnect();
      return { status: true };
    }
  } catch (err) {
    return { status: false, error: err };
  }
};
