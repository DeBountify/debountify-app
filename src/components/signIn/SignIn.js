"use client";
import React, { useEffect, useState } from "react";
import RegisterInput from "./RegisterInput";
import Image from "next/image";
import { getProvider } from "@/actions/auth";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../common/Alert";
import {
  clearError,
  clearMessages,
  createUserProfile,
  getUserProfileDetails,
} from "@/redux/actions/userActions";

const SignIn = () => {
  const { userState, loading, error, msg } = useSelector((state) => state.user);
  const [isRegister, setIsRegister] = useState(true);
  const [provider, setProvider] = useState(null);
  const wallet = useAnchorWallet();
  const dispatch = useDispatch();
  // register function
  const handleRegister = async (userData) => {
    dispatch(createUserProfile(wallet, userData));
  };

  // get provider
  useEffect(() => {
    const { status, data } = getProvider();
    if (status) setProvider(data);
    else setProvider(undefined);
  }, []);

  useEffect(() => {
    if (error) {
      if (error === "Profile not found") {
        setIsRegister(false);
        showAlert("Please register to proceed", false, "error");
      } else {
        showAlert(error, false, "error");
      }
      dispatch(clearError());
    }
    if (msg) {
      showAlert(msg, true, "success");
      dispatch(clearMessages());
      if (wallet?.publicKey) {
        dispatch(getUserProfileDetails(wallet));
      }
    }
  }, [error, msg, wallet]);

  return (
    <>
      {loading ? (
        <Loader center={true} />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 p-14">
            {provider ? (
              <>
                <div className="flex flex-col text-white py-4">
                  <h1 className="text-4xl font-bold">Welcome</h1>
                  <h1>Have an account ? Login</h1>
                </div>
                <div className="border-b-2 py-4 text-center">
                  {/* <LoginInput handleLogin={handleLogin} loading={loading}/> */}
                  <WalletMultiButton />
                </div>

                {wallet?.publicKey && userState?.userName === undefined && (
                  <div className="text-white py-4">
                    <RegisterInput
                      walletAddress={wallet?.publicKey?.toBase58()}
                      isRegister={isRegister}
                      setIsRegister={setIsRegister}
                      handleRegister={handleRegister}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex flex-col text-white py-4">
                  <h1 className="text-4xl font-bold">
                    Install Phantom Wallet to continue login
                  </h1>
                </div>
              </>
            )}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <Image
              alt="joinus"
              src="/images/undraw_join.svg"
              width={400}
              height={400}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
