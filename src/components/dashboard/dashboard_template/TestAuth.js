"use client";
import React, { useState } from "react";
import GradientButton from "@/components/common/GradientButton";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { checkWalletBalance } from "@/redux/actions/web3/userActions";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const TestAuth = () => {
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);

  const handleClick = async () => {
    const key = wallet.publicKey;
    const bal = await checkWalletBalance(key);
    setBalance(bal);
  };

  return (
    <div>
      <h1 className="font-bold">Welcome</h1>
      <p>User Details</p>
      <p>Name: {"name"}</p>
      <p>Wallet Address: {wallet.publicKey?.toBase58()}</p>
      {balance !== null ? `${balance / LAMPORTS_PER_SOL} SOL` : "Loading..."}
      <div className="flex flex-row gap-4 items-center">
        <GradientButton
          className=" text-white bg-gradient-to-r from-btn_purple_l to-btn_purple_r"
          title={"Check Balance"}
          onClick={handleClick}
        />
        {/* <GradientButton
          className=" text-white bg-gradient-to-r from-btn_purple_l to-btn_purple_r"
          title={
            loading ? (
              <IconTemplate
                icon="bx:loader-circle"
                className="animate-spin text-2xl"
              />
            ) : (
              "Logout"
            )
          }
          onClick={handleLogout}
          disabled={loading}
        /> */}
        <WalletDisconnectButton />
      </div>
    </div>
  );
};

export default TestAuth;
