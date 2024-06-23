import Link from "next/link";
import React from "react";
import IconTemplate from "../Icons/IconTemplate";

const SocialIcons = ({url, icon, className}) => {
  return (
    <Link href={url} target="_blank">
      <IconTemplate icon={icon} className={className} />
    </Link>
  );
};

export default SocialIcons;
