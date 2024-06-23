"use client";
import MainFooter from "@/components/common/MainFooter";
import Drawer from "@/components/dashboard/dashboard_template/drawer";
import Navbar from "@/components/dashboard/dashboard_template/navbar";
import { getAllBountyPrograms } from "@/redux/actions/bountryProgramsAction";
import {
  getAllUserProfile,
  getUserProfileDetails,
  userLogout,
} from "@/redux/actions/userActions";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const { userState, is_authenticated } = useSelector((state) => state.user);
  const router = useRouter();
  const isCompany = userState?.userType === "Company" ? true : false;
  const [isOpen, setIsOpen] = useState(true);
  const contentClass = isOpen ? "md:ml-76  lg:ml-80 " : "md:ml-7 lg:ml-10";
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const walletState = useWallet();

  const logoutAction = () => {
    // fix wallet issue later
    toast.info("Wallet disconnected", { toastId: 3 });
    dispatch(userLogout());
    router.push("/login");
  };

  useEffect(() => {
    if (!is_authenticated) {
      logoutAction();
    }
  }, [is_authenticated]);

  useEffect(() => {
    if (walletState?.connected && walletState?.publicKey && userState?.user) {
      if (walletState?.publicKey?.toString() !== userState?.user?.toString()) {
        logoutAction();
      }
    }
  }, [walletState, userState]);

  useEffect(() => {
    if (wallet?.publicKey) {
      dispatch(getUserProfileDetails(wallet));
      dispatch(getAllUserProfile(wallet));
      dispatch(getAllBountyPrograms(wallet));
    }
  }, [wallet]);

  return (
    <div className="flex flex-col h-screen transition-all relative">
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Drawer isCompany={isCompany} isOpen={isOpen} />

        <div
          className={`flex-1 text-4xl text-white overflow-y-auto overflow-x-hidden ${contentClass}`}
        >
          <div className="min-h-[85vh]">{children}</div>
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default Layout;
