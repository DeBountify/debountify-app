import React from "react";
import GradientButton from "../common/GradientButton";
import dynamic from "next/dynamic";
const IconTemplate = dynamic(() => import("@/components/icons/IconTemplate"));

const LoginInput = ({ handleLogin, loading }) => {
  return (
    <div>
      <GradientButton
        className="w-full text-white bg-gradient-to-r from-btn_purple_l to-btn_purple_r"
        title={
          loading ? (
            <IconTemplate
              icon="bx:loader-circle"
              className="animate-spin text-2xl"
            />
          ) : (
            "Connect Wallet & Login"
          )
        }
        disabled={loading}
        onClick={handleLogin}
      />
    </div>
  );
};

export default LoginInput;
