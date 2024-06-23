"use client";
import React, { useEffect, useState } from "react";
import "./BugBountProgram.css";
import Loader from "@/components/loader/Loader";
import GradientButton from "@/components/common/GradientButton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { isExpired } from "@/components/dashboard/company/utils/formatDate";
import { getRewardAmount } from "@/components/dashboard/company/utils/formRewardAmount";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessages,
  deleteBountyProgramAction,
} from "@/redux/actions/bountryProgramsAction";
import { showAlert } from "@/components/common/Alert";
import { useRouter } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const BugBountyPrograms = ({ params }) => {
  const { bountyProgramsState, endedBountyPrograms, loading, error, msg } =
    useSelector((state) => state.bountyPrograms);
  const { companyUserState, userState } = useSelector((state) => state.user);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [programDetails, setProgramDetails] = useState({});
  const [isEndedProgram, setIsEndedProgram] = useState(false);
  const { id } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  useEffect(() => {
    setProgramDetails(() => {
      let program = {};
      program = bountyProgramsState.find(
        (program) => program.publicKey.toString() === id
      );
      if (!program?.publicKey) {
        program = endedBountyPrograms.find(
          (program) => program.publicKey.toString() === id
        );
        setIsEndedProgram(true);
      }
      return program;
    });
  }, [bountyProgramsState, id, endedBountyPrograms]);

  const handleAccordionToggle = (accordionId) => {
    setActiveAccordion(accordionId === activeAccordion ? null : accordionId);
  };

  const deleteProgram = () => {
    const data = {
      bountyProgramPda: programDetails?.publicKey,
    };
    dispatch(deleteBountyProgramAction(wallet, data));
  };

  useEffect(() => {
    if (error) {
      showAlert(error, false, "deleteProgramError");
      dispatch(clearError());
    }
    if (msg) {
      showAlert(error, true, "successProgramError");
      dispatch(clearMessages());
      router.push("/dashboard/company/programs");
    }
  }, [error, msg]);
  return (
    <>
      {loading ? (
        <Loader center={true} />
      ) : (
        <div className="my-8 mr-3">
          {programDetails?.publicKey ? (
            <>
              <div className="w-full relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
                <div className="relative z-10 text-white p-2">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <div className="flex flex-row gap-4">
                        <div className="rounded-full overflow-hidden">
                          <Image
                            alt={programDetails?.account?.title}
                            className="hover:scale-110 transition-all cursor-pointer"
                            src={`${process.env.PINATA_VIEW_API}${
                              companyUserState?.find(
                                (data) =>
                                  data?.account?.user?.toString() ===
                                  programDetails?.account?.user?.toString()
                              )?.account?.userImage
                            }`}
                            height={150}
                            width={150}
                          />
                        </div>
                        <div className="py-2">
                          <div className="relative">
                            <h1 className="text-2xl font-bold">
                              {programDetails?.account?.title}
                            </h1>
                            <Badge
                              className={`absolute left-full top-0 ${
                                isExpired(programDetails?.account?.endDate) ||
                                isEndedProgram
                                  ? "bg-red-500"
                                  : "bg-green-500"
                              }`}
                            >
                              {isExpired(programDetails?.account?.endDate) ||
                              isEndedProgram
                                ? "Expired"
                                : "Active"}
                            </Badge>
                          </div>
                          <p
                            className="text-base text-gray-300"
                            dangerouslySetInnerHTML={{
                              __html: programDetails?.account?.description,
                            }}
                          ></p>
                          <p className="text-base text-gray-400/50">
                            Start Date: {programDetails?.account?.startDate}
                          </p>
                          <p className="text-base text-gray-400/50">
                            End Date: {programDetails?.account?.endDate}
                          </p>
                          {userState?.userType === "Company" && (
                            <p className="text-base text-gray-400/50">
                              Remaining Balance:{" "}
                              {getRewardAmount(
                                programDetails?.account?.remainingBalance
                              )}{" "}
                              Sol
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      {!isEndedProgram && (
                        <div className="flex flex-col gap-3 h-full justify-center items-center">
                          {userState?.userType === "Company" ? (
                            <>
                              <GradientButton
                                title={"Edit Program"}
                                url={`${
                                  isExpired(programDetails?.account?.endDate)
                                    ? ""
                                    : `/dashboard/company/edit-program/${id}`
                                }`}
                                className="bg-gradient-to-r from-btn_purple_l to-btn_purple_r px-9 py-4 rounded-lg text-xl"
                                disabled={isExpired(
                                  programDetails?.account?.endDate
                                )}
                              />
                              <GradientButton
                                title={"End Program"}
                                className="bg-red-400 hover:bg-red-500 transition-all px-9 py-4 rounded-lg text-xl"
                                disabled={isExpired(
                                  programDetails?.account?.endDate
                                )}
                                onClick={deleteProgram}
                              />
                            </>
                          ) : (
                            <GradientButton
                              url={`${
                                isExpired(programDetails?.account?.endDate)
                                  ? ""
                                  : `/dashboard/user/submit-bug/${id}`
                              }`}
                              title={"Submit Report"}
                              className="bg-gradient-to-r from-btn_purple_l to-btn_purple_r px-9 py-4 rounded-lg text-xl"
                              disabled={isExpired(
                                programDetails?.account?.endDate
                              )}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-between">
                {/* First Div (3/4 width) */}
                <div className="relative rounded-xl shadow-md w-3/4 h-auto my-8 overflow-hidden">
                  <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
                  <div className="relative z-10 text-white">
                    <section className="flex items-center lg:h-auto">
                      <div className="p-4 mx-auto w-screen">
                        <div className="w-auto">
                          <div
                            className={`flex flex-col justify-between w-full px-6 py-4 mb-3 rounded shadow transition-all duration-900 ${
                              activeAccordion === "accordion1" ? "active" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-2xl">Scope</span>
                              <button
                                className="p-2 bg-purple-500 rounded-full"
                                onClick={() =>
                                  handleAccordionToggle("accordion1")
                                }
                              >
                                {activeAccordion === "accordion1" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {activeAccordion === "accordion1" && (
                              <div className="sections">
                                <h4 className="scope-title my-4 text-sm">
                                  In Scope
                                </h4>
                                <div  className="text-base"
                                  dangerouslySetInnerHTML={{
                                    __html: programDetails?.account?.scope,
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>

                          <div
                            className={`flex flex-col justify-between w-full px-6 py-4 mb-3 rounded shadow transition-all duration-900 ${
                              activeAccordion === "accordion3" ? "active" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-2xl">
                                Program Rules
                              </span>
                              <button
                                className="p-2 bg-purple-500 rounded-full"
                                onClick={() =>
                                  handleAccordionToggle("accordion3")
                                }
                              >
                                {activeAccordion === "accordion3" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {activeAccordion === "accordion3" && (
                              <div
                                className="section li-bullet mt-6 text-base"
                                dangerouslySetInnerHTML={{
                                  __html: programDetails?.account?.programRules,
                                }}
                              ></div>
                            )}
                          </div>
                          <div
                            className={`flex flex-col justify-between w-full px-6 py-4 mb-3 rounded shadow transition-all duration-900 ${
                              activeAccordion === "accordion4" ? "active" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-2xl">
                                Disclosure Guidelines
                              </span>
                              <button
                                className="p-2 bg-purple-500 rounded-full"
                                onClick={() =>
                                  handleAccordionToggle("accordion4")
                                }
                              >
                                {activeAccordion === "accordion4" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {activeAccordion === "accordion4" && (
                              <div className="mt-1 text-sm text-gray-100 answer">
                                <div className="section li-bullet">
                                  <ul className="list-disc pl-6 mt-6">
                                    <li className="text-base leading-6 text-white mb-2">
                                      Do not discuss this program or any
                                      vulnerabilities (even resolved ones)
                                      outside of the program without express
                                      consent from the organization
                                    </li>
                                    <li className="text-base leading-6 text-white mb-2">
                                      No vulnerability disclosure, including
                                      partial, is allowed for the moment.
                                    </li>
                                    <li className="text-base leading-6 text-white mb-2">
                                      Please do NOT publish/discuss bugs
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                          <div
                            className={`flex flex-col justify-between w-full px-6 py-4 mb-3 rounded shadow transition-all duration-900 ${
                              activeAccordion === "accordion5" ? "active" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-2xl">
                                Eligibility and Coordinated Disclosure
                              </span>
                              <button
                                className="p-2 bg-purple-500 rounded-full"
                                onClick={() =>
                                  handleAccordionToggle("accordion5")
                                }
                              >
                                {activeAccordion === "accordion5" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-white"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {activeAccordion === "accordion5" && (
                              <div id="eligibility_and_coordinate">
                                <div className="section li-bullet">
                                  <p className="text-base leading-6 mt-5 text-gray-300">
                                    We are happy to thank everyone who submits
                                    valid reports which help us improve the
                                    security. However, only those that meet the
                                    following eligibility requirements may
                                    receive a monetary reward:
                                  </p>

                                  <ul className="list-disc pl-6">
                                    <li className="text-base leading-6 text-gray-300">
                                      You must be the first reporter of a
                                      vulnerability.
                                    </li>
                                    <li className="text-base leading-6 text-gray-300">
                                      The vulnerability must be a qualifying
                                      vulnerability.
                                    </li>
                                    <li className="text-base leading-6 text-gray-300">
                                      Any vulnerability found must be reported
                                      no later than 24 hours after discovery and
                                      exclusively through hackenproof.com.
                                    </li>
                                    <li className="text-base leading-6 text-gray-300">
                                      You must send a clear textual description
                                      of the report along with steps to
                                      reproduce the issue, include attachments
                                      such as screenshots or proof of concept
                                      code as necessary.
                                    </li>
                                    <li className="text-base leading-6 text-gray-300">
                                      You must not be a former or current
                                      employee of us or one of its contractors.
                                    </li>
                                    <li className="text-base leading-6 text-gray-300">
                                      ONLY USE the EMAIL under which you
                                      registered your HackerProof account (in
                                      case of violation, no bounty can be
                                      awarded).
                                    </li>
                                    <li className="text-base leading-6 text-gray-300">
                                      Provide detailed but to-the-point
                                      reproduction steps.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
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
                      <h2 className="text-2xl font-bold mb-4 text-white">
                        Rewards
                      </h2>
                      <h2 className="h2 title text-white text-xl">
                        Range of bounty
                      </h2>
                      <div className="panel-flat">
                        <p className="count text-gray-300 flex gap-3 items-center">
                          <span className="text text-gray-300 text-lg">
                            {getRewardAmount(
                              programDetails?.account?.rewardRange?.lowLb
                            )}
                          </span>
                          <span className="text text-gray-300 text-lg">-</span>
                          <span className="text text-gray-300 text-base">
                            {getRewardAmount(
                              programDetails?.account?.rewardRange?.criticalUb
                            )}
                          </span>
                          <span className="text text-gray-300 text-lg">
                            Sol
                          </span>
                        </p>
                        <h3 className="text-2xl font-bold mb-4 text-white mt-4">
                          Severity
                        </h3>
                        <div className="severity-content flex items-center">
                          <div className="critical severity-cell flex flex-row severity-label">
                            <span className="text text-[#54e247] text-base mr-4">
                              Critical
                            </span>
                            <span className="text text-gray-300 text-base">
                              {getRewardAmount(
                                programDetails?.account?.rewardRange?.criticalUb
                              )}{" "}
                              Sol
                            </span>
                          </div>
                        </div>
                        <div className="severity-content flex items-center">
                          <div className="critical severity-cell flex flex-row severity-label">
                            <span className="text text-[#EB382A] text-base mr-4">
                              High
                            </span>
                            <span className="text text-gray-300 text-base">
                              {getRewardAmount(
                                programDetails?.account?.rewardRange?.highUb
                              )}{" "}
                              Sol
                            </span>
                          </div>
                        </div>
                        <div className="severity-content flex items-center">
                          <div className="critical severity-cell flex flex-row severity-label">
                            <span className="text text-teal-500 text-base mr-3">
                              Medium
                            </span>
                            <span className="text text-gray-300 text-base">
                              {getRewardAmount(
                                programDetails?.account?.rewardRange?.mediumUb
                              )}{" "}
                              Sol
                            </span>
                          </div>
                        </div>
                        <div className="severity-content flex items-center">
                          <div className="critical severity-cell flex flex-row severity-label">
                            <span className="text text-[#F0CF5B] text-base mr-3">
                              Low
                            </span>
                            <span className="text text-gray-300 text-base">
                              {getRewardAmount(
                                programDetails?.account?.rewardRange?.lowUb
                              )}{" "}
                              Sol
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="panel-flat mt-6">
                        <h2 className="text-2xl font-bold mb-4 text-white">
                          Tags
                        </h2>
                        <div className="skills flex flex-row  items-center mt-4">
                          {programDetails?.account?.tags
                            ?.split(",")
                            ?.map((tag, i) => (
                              <span
                                key={i}
                                className="tag  bg-opacity-5 bg-gray-50 cursor-pointer transition-all hover:bg-gray-800 backdrop-blur-xl px-2 py-1 rounded-3xl text-xs mr-2 mb-2`"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full justify-center items-center h-full">
              <h2 className="text-center font-bold text-2xl">
                No Programs found.
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BugBountyPrograms;
