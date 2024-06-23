import { Input } from "@/components/ui/input";
import React from "react";

const InputForm = ({ title, name, className,error, ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-white text-sm font-bold mb-2">
        <span className="flex flex-row items-center">
          <p>{title}</p>
          <sup className="text-red-500 text-lg">{props?.required && "*"}</sup>
        </span>
      </label>
      <Input
        onWheel={(e) => props?.type === "number" && e.target.blur()}
        title={title}
        name={name}
        className="text-black"
        {...props}
      />
      {error && <p className="text-red-500 text-sm my-2 italic">{error}</p>}
    </div>
  );
};

export default InputForm;
