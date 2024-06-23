"use client";
import GradientButton from "@/components/common/GradientButton";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTags } from "../company/utils/stripTags";
import AcceptRejectModal from "./AcceptRejectModal";
import {
  acceptBugReportAction,
  clearError,
  clearMessages,
  getBugReports,
  rejectBugReportAction,
} from "@/redux/actions/bugReportsActions";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { showAlert } from "@/components/common/Alert";
import { getAllBountyPrograms } from "@/redux/actions/bountryProgramsAction";
import { formatToDateTime } from "../company/utils/formatDate";
import { deleteBugReport } from "@/hooks/deBountify_utils";
import { useRouter } from "next/navigation";

const BugReport = ({ id }) => {
  const { reportState, loading, msg, error } = useSelector(
    (state) => state.reports
  );
  const { hackerUserState, companyUserState, userState } = useSelector(
    (state) => state.user
  );
  const { bountyProgramsState, endedBountyPrograms } = useSelector(
    (state) => state.bountyPrograms
  );
  const [report, setReport] = useState({});
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [forAccept, setForAccept] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    setReport(reportState?.find((data) => data?.publicKey.toString() === id));
  }, [reportState, id]);

  useEffect(() => {
    if (report?.account?.user) {
      setUser(
        hackerUserState?.find(
          (data) =>
            data?.account?.user?.toString() ===
            report?.account?.user?.toString()
        )
      );
      let bountyProgramUser;
      if (report?.account?.isAccepted) {
        bountyProgramUser = endedBountyPrograms?.find(
          (data) =>
            data?.publicKey?.toString() ===
            report?.account?.bountyProgramRef?.toString()
        );
      } else {
        bountyProgramUser = bountyProgramsState?.find(
          (data) =>
            data?.publicKey?.toString() ===
            report?.account?.bountyProgramRef?.toString()
        );
      }

      if (bountyProgramsState) {
        setCompany(
          companyUserState?.find(
            (data) =>
              data?.account?.user?.toString() ===
              bountyProgramUser?.account?.user?.toString()
          )
        );
      }
    }
  }, [report, hackerUserState, companyUserState, bountyProgramsState]);

  // call bounty program if not available
  useEffect(() => {
    if (bountyProgramsState.length === 0) {
      if (wallet?.publicKey) {
        dispatch(getAllBountyPrograms(wallet));
      }
    }
  }, [wallet?.publicKey]);

  const handleModal = (value) => {
    setForAccept(value);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      showAlert(
        forAccept
          ? "Please enter payable amount for the bug report"
          : "Please enter reject reason for the bug report",
        false,
        "bug-report-value-error"
      );
      return;
    }
    if (forAccept) {
      const data = {
        bugSeverity: report?.account?.bugSeverity,
        payableAmount: value.target.value,
        bountyProgramAddress: report?.account?.bountyProgramRef,
        bugReportAddress: report?.publicKey,
        hackerPubKey: report?.account?.user,
        hackerPda: user?.publicKey,
      };
      dispatch(acceptBugReportAction(wallet, data));
    } else {
      const data = {
        bountyProgramAddress: report?.account?.bountyProgramRef,
        bugReportAddress: report?.publicKey,
        reject_reason: value.target.value,
      };
      dispatch(rejectBugReportAction(wallet, data));
    }
  };

  // download file
  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.href = process.env.PINATA_VIEW_API + report?.account?.bugFileUrl;
    link.target = "_blank";
    link.download = "poc";
    link.click();
  };

  useEffect(() => {
    if (error) {
      showAlert(error, false, "bug-report-error");
      dispatch(clearError());
    }
    if (msg) {
      showAlert(msg, true, "bug-report-success");
      dispatch(clearMessages());
      setIsOpen(false);
      if (wallet?.publicKey) {
        dispatch(getBugReports(wallet));
      }
      router.back();
    }
  }, [error, msg, wallet]);

  //only for debug purpose
  // useEffect(() => {
  //   deleteBugReport(wallet, report?.publicKey);
  // }, [report])
  console.log(company);
  return (
    <div>
      {report?.publicKey ? (
        <div>
          <div className="my-8 mr-3">
            <div className="w-full relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
              <div className="relative z-10 text-white p-2">
                <div className="grid grid-cols-4">
                  <div className="col-span-3">
                    <div className="flex flex-row gap-4 px-5 py-4">
                      <div className="py-2">
                        <div className="relative w-11/12">
                          <p className="text-xl font-bold ">
                            {report?.account?.bugTitle}
                          </p>
                          <p className="text-lg italic font-light">
                            {removeTags(report?.account?.bugDescription)}
                          </p>
                          <Badge
                            className={` left-2/3 top-0 bg-orange-500 ${
                              report?.account?.isAccepted ? "!bg-green-500" : ""
                            } ${
                              report?.account?.isRejected ? "!bg-red-500" : ""
                            }`}
                          >
                            {report?.account?.isAccepted
                              ? "Accepted"
                              : report?.account?.isRejected
                              ? "Rejected"
                              : "Pending"}
                          </Badge>
                        </div>
                        <p className=" text-gray-300">
                          <span className="text-xl">
                            Reported By: &nbsp;&nbsp;
                          </span>
                          <span className="text-xl">
                            {user?.account?.userName}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex space-x-4"></div>
                    {userState?.userType === "Company" && (
                      <div className="flex h-full justify-center  items-center">
                        {!(
                          report?.account?.isAccepted ||
                          report?.account?.isRejected
                        ) && (
                          <div className="flex h-full justify-center  items-center">
                            <GradientButton
                              onClick={() => handleModal(true)}
                              title="Accept"
                              className="bg-[#4CAF4F] px-9 py-2 rounded-bl-2xl rounded-tr-2xl hover:bg-green-700"
                            />{" "}
                            &nbsp;&nbsp;
                            <GradientButton
                              onClick={() => handleModal(false)}
                              title="Reject"
                              className="bg-red-600  px-9 py-2 rounded-br-2xl rounded-tl-2xl hover:bg-red-700"
                            />
                            <AcceptRejectModal
                              isOpen={isOpen}
                              openFunction={setIsOpen}
                              loading={loading}
                              forAccept={forAccept}
                              setValue={setValue}
                              handleSubmit={handleSubmit}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-between">
              <div className="relative rounded-xl shadow-md w-3/4 h-auto my-8 overflow-hidden">
                <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
                <div className="relative z-10 text-white p-5">
                  <section className="flex items-center lg:h-auto">
                    <div className="p-4 mx-auto w-screen">
                      <div>
                        <h3> Summary:</h3>
                        <div
                          className="text-lg pt-4 pb-7"
                          dangerouslySetInnerHTML={{
                            __html: report?.account?.bugDescription,
                          }}
                        ></div>
                      </div>
                      <div>
                        <h3> Validation Steps:</h3>
                        <div
                          className="text-lg pt-4 pb-7"
                          dangerouslySetInnerHTML={{
                            __html: report?.account?.bugValidationSteps,
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <h3> Poc:</h3>
                        <GradientButton
                          onClick={handleDownloadFile}
                          className="bg-gradient-to-r from-btn_purple_l to-btn_purple_r px-9 py-2 rounded-br-2xl rounded-tl-2xl"
                          title="Download"
                        />
                      </div>
                      {report?.account?.rejectReason && (
                        <div className="flex flex-row items-center gap-3 my-4">
                          <h3> Reject Reason:</h3>
                          <p className="text-lg italic font-light">
                            {report?.account?.rejectReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>

              {/* Second Div (1/4 width) */}
              <div className="relative rounded-xl shadow-md w-1/4 h-auto max-h-[75vh] my-8 ml-3 overflow-hidden">
                <div className="absolute inset-0 bg-blur-lg"></div>
                <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
                <div className="p-8 relative z-10">
                  <div className="sidebar">
                    <InfoItem
                      label="Disclosed"
                      value={formatToDateTime(report?.account?.submittedAt)}
                    />
                    <InfoItem
                      label="Report to"
                      value={company?.account?.userName}
                    />
                    <InfoItem
                      label="Severity"
                      value={report?.account?.bugSeverity}
                    />
                    <InfoItem
                      label="Category"
                      value={report?.account?.bugCategory}
                    />
                    <InfoItem
                      label="Scope"
                      value={report?.account?.bugScopeTarget}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Report Found</div>
      )}
    </div>
  );
};

export default BugReport;

const InfoItem = ({ label, value }) => {
  return (
    <div className="flex flex-row justify-between items-baseline py-2">
      <div className="text-white text-lg font-bold">{label}:</div>
      <div className="text-white text-sm ml-2">{value}</div>
    </div>
  );
};
