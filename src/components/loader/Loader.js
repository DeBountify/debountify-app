import React from "react";
import "./Loader.css";

const Loader = ({ center }) => {
  return (
    <div
      className={`${
        center && "flex justify-center items-center w-full h-screen"
      }`}
    >
      <div className="shapes"></div>
    </div>
  );
};

export default Loader;
