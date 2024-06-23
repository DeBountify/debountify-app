"use client";

import IconTemplate from "@/components/Icons/IconTemplate";
import GradientButton from "@/components/common/GradientButton";
import { useFormStatus } from "react-dom";

export function SubmitButton({ isedit, ...props }) {
  const { pending } = useFormStatus();

  return (
    <GradientButton
      disabled={pending}
      title={`${
        pending ? (
          <IconTemplate
            icon={"fa-solid:spinner"}
            className="text-white text-2xl animate-spin"
          />
        ) : (
          (isedit ? "Edit" : "Create") + " Bounty Program"
        )
      }`}
      className="bg-gradient-to-r from-btn_purple_l to-btn_purple_r px-9 py-2 rounded-br-2xl rounded-tl-2xl flex-row-reverse"
      {...props}
    />
  );
}
