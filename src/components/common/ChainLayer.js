import Image from "next/image";
import React from "react";

const ChainLayer = ({className, img}) => {
  return (
    <Image
      className={`absolute ${className}`}
      src={`/images/${img || "Layer_1.png"}`}
      alt="hero"
      width={200}
      height={500}
    />
  );
};

export default ChainLayer;
