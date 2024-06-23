"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { persistor, store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname } from "next/navigation";
import { Wallet } from "./Wallet";

const Provider = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname().split("/")[1];
  useEffect(() => {
    setShowNavbar(pathname === "dashboard" ? false : true);
  }, [pathname]);

  return (
    <Wallet>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          {showNavbar && <Navbar />}
          {children}
        </PersistGate>
      </ReduxProvider>
    </Wallet>
  );
};

export default Provider;
