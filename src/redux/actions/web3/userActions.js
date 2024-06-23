import { Connection } from "@solana/web3.js";

//check balance
export const checkWalletBalance = async (publicKey) => {
  try {
    // Create a connection to the Solana network
    const connection = new Connection(process.env.SOLANA_URL);

    // Get the balance of the provided wallet public key
    const balance = await connection.getBalance(publicKey);

    return balance;
  } catch (error) {
    throw error; // Handle the error appropriately in your application
  }
};
