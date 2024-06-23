"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { truncateDescription } from "../company/utils/truncateDescription";
import { formatToDateTime } from "../company/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getBugReports } from "@/redux/actions/bugReportsActions";
import Loader from "@/components/loader/Loader";
import TitleBox from "@/components/common/TitleBox";

const BugReports = ({ isCompany }) => {
  const { reportState, loading } = useSelector((state) => state.reports);
  const { userState } = useSelector((state) => state.user);
  const { bountyProgramsState, endedBountyPrograms } = useSelector(
    (state) => state.bountyPrograms
  );
  const [reports, setReports] = useState([]);
  const [bountyAddress, setBountyAddress] = useState([]);
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();

  // get the reports
  useEffect(() => {
    if (wallet?.publicKey) {
      dispatch(getBugReports(wallet));
    }
  }, [wallet]);

  // set the reports based on the user type
  useEffect(() => {
    if (reportState?.length > 0) {
      if (isCompany) {
        setBountyAddress(() => {
          let bountyProgram = [];
          bountyProgram = bountyProgramsState.filter(
            (data) =>
              data?.account?.user.toString() === userState?.user?.toString()
          );
          if (bountyProgram?.length === 0) {
            bountyProgram = endedBountyPrograms.filter(
              (data) =>
                data?.account?.user.toString() === userState?.user?.toString()
            );
          }
          return bountyProgram;
        });
        if (bountyAddress.length > 0) {
          const matchedReports = bountyAddress.map((program) => {
            return reportState.filter(
              (report) =>
                report?.account?.bountyProgramRef?.toString() ===
                program?.publicKey?.toString()
            );
          });
          return setReports(matchedReports[0]);
        }
      } else {
        setReports(
          reportState.filter(
            (data) =>
              data?.account?.user.toString() === userState?.user?.toString()
          )
        );
      }
    }
  }, [reportState, bountyProgramsState]);

  return (
    <>
      {loading ? (
        <Loader center={true} />
      ) : (
        <div className="container mx-auto px-4">
          <>
            <div>
              <TitleBox>
                <div className="flex justify-center items-center">
                  <p className="text-xl font-semibold">Bug Reports</p>
                </div>
              </TitleBox>

              {reports?.length > 0 ? (
                <div>
                  <div className="w-full">
                    <div className="flex flex-wrap gap-4 mt-8 shadow-md">
                      {reports?.map((card, i) => (
                        <div key={i} className="sm:w-screen">
                          <div className="w-full rounded-t-lg shadow-md overflow-hidden bg-opacity-10 flex-col md:p-4 bg-blue-600 backdrop-blur-xl relative flex sm:flex-row">
                            <div className="md:py-0 py-4 px-14 md:px-4 flex-1 basis-1/2 flex sm:flex-row flex-col justify-between relative">
                              <div className="flex_program_fe flex-1 sm:basis-1/6 relative">
                                <Link
                                  href={`/dashboard/report/${card?.publicKey}`}
                                  className="text-lg  mb-1 font-semibold"
                                >
                                  {card?.account?.bugTitle}
                                </Link>
                                <p className=" mb-2 text-base h-14 overflow-hidden">
                                  {truncateDescription(
                                    card?.account?.bugDescription
                                  )}
                                </p>
                                <Badge
                                  className={`absolute top-4 left-1/2 ${
                                    card?.account?.isAccepted
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                >
                                  {card?.account?.isAccepted
                                    ? "Accepted"
                                    : card?.account?.isRejected
                                    ? "Rejected"
                                    : "Not Accepted Yet"}
                                </Badge>
                              </div>
                              <div className="text-sm md:flex-row flex-1 flex-1/4 sm:ml-4 align-items-end sm:mr-4">
                                <div className="md:flex-col flex-1 text-left">
                                  <p className="text-base">
                                    <span className="text-slate-300 font-semibold">
                                      Submitted date:
                                    </span>{" "}
                                    <span>
                                      {formatToDateTime(
                                        card?.account?.submittedAt?.toString()
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="md:border-l-2 border-gray-300"></div>
                              <div className="text-sm md:flex-row flex-1 flex-1/4 ">
                                <div className="flex-1 text-end">
                                  <p>
                                    <span className="text-lg">Category:</span>{" "}
                                    {card?.account?.bugCategory}
                                  </p>
                                  <p>
                                    <span className="text-lg">Severity:</span>{" "}
                                    {card?.account?.bugSeverity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full text-center md:pl-6 md:pr-6">
                            <hr className="w-full mx-auto " />
                          </div>
                          <div className="w-full shadow-md md:pl-4 md:pr-4 md:pb-1 md:pt-1 overflow-hidden rounded-b-lg relative bg-opacity-10 bg-blue-600 backdrop-blur-xl flex md:flex-row"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 flex justify-center items-center">
                  <p className="text-3xl font-semibold">No Reports Found</p>
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default BugReports;
