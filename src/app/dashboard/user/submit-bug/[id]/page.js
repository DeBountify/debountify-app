import SubmitBugReport from "@/components/dashboard/user/SubmitBugReport";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <SubmitBugReport id={id}/>
    </div>
  );
};

export default page;
