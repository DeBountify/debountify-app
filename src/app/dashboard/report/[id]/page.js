import BugReport from "@/components/dashboard/report/BugReport";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <BugReport id={id} />
    </div>
  );
};

export default page;
