import Loader from "@/components/loader/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader center={true}/>
    </div>
  );
};

export default loading;
