import React from "react";

const TitleBox = ({children}) => {
  return (
    <div
      className="p-4"
      style={{
        borderRadius: "1.25rem",
        border: "1px solid #F8F9FA",
        boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        margin: "2rem",
      }}
    >{children}</div>
  );
};

export default TitleBox;
