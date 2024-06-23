import React from "react";
import { Textarea } from "../ui/textarea";

const TextAreaInput = ({
  value,
  setFunction,
  className,
  id,
  label,
  type,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="marck">
        {label}
      </label>
      <Textarea
        id={id}
        type={type}
        value={value}
        onChange={(e) => setFunction(e)}
        className={`text-black ${className}}`}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
