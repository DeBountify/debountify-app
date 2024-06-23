"use client";
import { showAlert } from "@/components/common/Alert";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { userState, is_authenticated } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (userState?.userType !== "Company" && is_authenticated) {
      router.push("/dashboard");
      showAlert(
        "You are not authorized to access this page",
        false,
        "unable to access page"
      );
    }
  }, [userState]);
  return <div>{children}</div>;
};

export default Layout;
