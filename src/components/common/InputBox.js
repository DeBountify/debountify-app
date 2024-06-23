import React from "react";
import { Input } from "../ui/input";

const InputBox = ({
  value,
  setFunction,
  className,
  id,
  label,
  type,
  error,
  labelClassname,
  ...props
}) => {
  return (
    <div className={`mb-4`}>
      <label htmlFor={id} className={`marck ${labelClassname}`}>
        {label}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setFunction(e)}
        className={`text-black ${className}}`}
        {...props}
      />
      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputBox;
