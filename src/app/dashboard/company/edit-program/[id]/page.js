import Createbounty from "@/components/dashboard/company/createbounty";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return <div>
    <Createbounty bountyAddress={id} isedit={true} />
    </div>;
};

export default page;
