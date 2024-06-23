import React from "react";
import dynamic from "next/dynamic";
const IconTemplate = dynamic(() => import("../icons/IconTemplate"));
import "@/assets/styles/featureBox.css";

const FeaturesBox = ({ className, icon, text, Create }) => {
  return (
    <div
      className={`flex flex-row border-text_body border overflow-hidden ${className}`}
    >
      <div className="gradient p-4">
        <IconTemplate icon={icon} className="text-white text-5xl" />
      </div>
      <div className="m-auto p-4">
        <h3 className="marck text-white text-2xl">{text}</h3>
      </div>
    </div>
  );
};

export default FeaturesBox;
