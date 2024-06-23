import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect } from "react";
import { showAlert } from "./Alert";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileDetails } from "@/redux/actions/userActions";

const ConnectWallet = () => {
  const { is_authenticated } = useSelector((state) => state.user);
  const router = useRouter();
  const wallet = useWallet();
  const dispatch = useDispatch();

  // redirect to dashboard if user is authenticated
  useEffect(() => {
    if (is_authenticated && wallet?.publicKey) {
      router.push("/dashboard");
      showAlert("Login Successful", true, 2);
    }
  }, [is_authenticated, wallet]);

  useEffect(() => {
    if (wallet?.publicKey && !is_authenticated) {
      dispatch(getUserProfileDetails(wallet));
    }
  }, [wallet, is_authenticated]);

  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWallet;
