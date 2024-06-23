import { userLogout } from "@/redux/actions/userActions";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useDispatch } from "react-redux";

const Disconnect = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLogout());
  };
  return (
    <div>
      <div onClick={logout}>
        <WalletDisconnectButton />
      </div>
    </div>
  );
};

export default Disconnect;
