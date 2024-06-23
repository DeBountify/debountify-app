"use client";
import { userLogout } from "@/redux/actions/userActions";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const page = () => {
    const dispatch = useDispatch();
    const router = useRouter();
  const handleLogout = () => {
    dispatch(userLogout());
    router.push("/login");
  };
  useEffect(() => {
    handleLogout();
  }, []);
  return <div>page</div>;
};

export default page;
