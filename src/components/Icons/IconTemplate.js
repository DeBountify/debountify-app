"use client";
import React from "react";
import { Icon } from "@iconify/react";

// icons website https://icon-sets.iconify.design/
const IconTemplate = ({ icon, className }) => {
  return (
    <div>
      <Icon className={className} icon={icon} />
    </div>
  );
};

export default IconTemplate;
