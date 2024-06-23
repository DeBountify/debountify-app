"use client";
import Loader from "@/components/loader/Loader";
import React, { useEffect, useState } from "react";
import { getRewardAmount } from "./utils/formRewardAmount";
import Link from "next/link";
import { useSelector } from "react-redux";
import { truncateDescription } from "./utils/truncateDescription";
import GradientButton from "@/components/common/GradientButton";
import TitleBox from "@/components/common/TitleBox";
import { distance, closest } from "fastest-levenshtein";

const BountyPrograms = ({ isCompany }) => {
  const { bountyProgramsState, loading, endedBountyPrograms } = useSelector(
    (state) => state.bountyPrograms
  );
  const [programs, setPrograms] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const { companyUserState, userState } = useSelector((state) => state.user);
  let colorIndex = 0;

  useEffect(() => {
    if (isCompany) {
      if (showHistory) {
        setPrograms(
          endedBountyPrograms?.filter(
            (program) =>
              program?.account?.user?.toString() === userState?.user?.toString()
          )
        );
      } else {
        setPrograms(
          bountyProgramsState?.filter(
            (program) =>
              program?.account?.user?.toString() === userState?.user?.toString()
          )
        );
      }
    } else {
      if (showHistory) {
        const recommendedPrograms = [];
        bountyProgramsState?.forEach((element) => {
          if (distance(userState?.skills, element?.account?.tags) < 25) {
            recommendedPrograms.push(element);
          }
          setPrograms(recommendedPrograms);
        });
      } else {
        setPrograms(bountyProgramsState);
      }
    }
  }, [bountyProgramsState, endedBountyPrograms, showHistory]);

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  // // get all bounty programs
  // useEffect(() => {
  //   if (wallet?.publicKey) {
  //     dispatch(getAllBountyPrograms(wallet));
  //   }
  // }, [wallet]);
  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <Loader center={true} />
      ) : (
        <>
          <div>
            <TitleBox>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Bounty Reports</p>
                {isCompany ? (
                  <GradientButton
                    onClick={handleShowHistory}
                    title={`${
                      showHistory
                        ? "Show active programs"
                        : "Show previous programs"
                    }`}
                    className="bg-purple-600 hover:bg-purple-700 py-2 font-bold"
                  />
                ) : (
                  <GradientButton
                    onClick={handleShowHistory}
                    title={`${
                      showHistory
                        ? "Show all programs"
                        : "Show recommended programs"
                    }`}
                    className="bg-purple-600 hover:bg-purple-700 py-2 font-bold"
                  />
                )}
              </div>
            </TitleBox>

            {programs?.length > 0 ? (
              <div>
                <div className="w-full">
                  <div className="flex flex-wrap gap-4 mt-8 shadow-md">
                    {programs?.map((card, i) => (
                      <div key={i} className="sm:w-screen">
                        <div className="w-full rounded-t-lg shadow-md overflow-hidden bg-opacity-10 flex-col md:p-4 bg-blue-600 backdrop-blur-xl relative flex sm:flex-row">
                          <div className="">
                            <img
                              src={`${process.env.PINATA_VIEW_API}${
                                companyUserState?.find(
                                  (data) =>
                                    data?.account?.user?.toString() ===
                                    card?.account?.user?.toString()
                                )?.account?.userImage
                              }`}
                              alt={card?.account?.title}
                              className="sm:w-32 sm:h-20 object-cover rounded-t-lg"
                            />
                          </div>

                          <div className="md:py-0 py-4 px-14 md:px-4 flex-1 basis-1/2 flex sm:flex-row flex-col justify-between relative">
                            <div className="flex_program_fe flex-1 sm:basis-1/6">
                              <Link
                                href={`/dashboard/program/${card?.publicKey}`}
                                className="text-lg  mb-1 font-semibold"
                              >
                                {card?.account?.title}
                              </Link>
                              <p className=" mb-2 text-base h-14 overflow-hidden">
                                {truncateDescription(
                                  card?.account?.description
                                )}
                              </p>
                            </div>
                            <div className="text-sm md:flex-row flex-1 flex-1/4 sm:ml-4 align-items-end sm:mr-4">
                              <div className="md:flex-col flex-1 text-left">
                                <p className="text-base">
                                  <span className="text-slate-300 font-semibold">
                                    Started date:
                                  </span>{" "}
                                  <span>{card?.account?.startDate}</span>
                                </p>
                                <p className="text-base">
                                  <span className="text-slate-300 font-semibold">
                                    End Date:
                                  </span>{" "}
                                  <span> {card?.account?.endDate}</span>
                                </p>
                              </div>
                              <p className="text-left text-base">
                                <span className="text-slate-300 font-semibold">
                                  Submitted reports:
                                </span>{" "}
                                <span>{card?.account?.submissions}</span>
                              </p>
                            </div>

                            <div className="md:border-l-2 border-gray-300"></div>
                            <div className="text-sm md:flex-row flex-1 flex-1/4 ">
                              <div className="flex-1 text-end">
                                <p>
                                  <span className=" text-lg">up to Sol: </span>
                                  <span className="text-2xl font-bold">
                                    {getRewardAmount(
                                      card?.account?.rewardRange?.criticalUb
                                    )}
                                  </span>
                                </p>
                                {/* <p>
                            <span className=" text-lg ">paid: </span>{" "}
                            {card?.bountyAmount}
                          </p> */}
                                <p>
                                  <span className="text-lg">Category:</span>{" "}
                                  {card?.account?.category}
                                </p>
                                {isCompany && (
                                  <p className="text-gray-300">
                                    <span className="text-base">
                                      Remaining Balance:
                                    </span>{" "}
                                    {getRewardAmount(
                                      card?.account?.remainingBalance
                                    )}{" "}
                                    Sol
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full text-center md:pl-6 md:pr-6">
                          <hr className="w-full mx-auto " />
                        </div>
                        <div className="w-full shadow-md md:pl-4 md:pr-4 md:pb-1 md:pt-1 overflow-hidden rounded-b-lg relative bg-opacity-10 bg-blue-600 backdrop-blur-xl flex md:flex-row">
                          <div className="flex flex-wrap  p-2">
                            {card?.account?.tags
                              ?.split(",")
                              ?.map((tag, index) => {
                                colorIndex++;
                                return (
                                  <span
                                    key={index}
                                    className={`tag  bg-opacity-5 bg-white backdrop-blur-xl px-2 py-1 rounded-3xl text-xs mr-2 mb-2`}
                                  >
                                    {tag}
                                  </span>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-96 flex justify-center items-center">
                <p className="text-3xl font-semibold">No Programs Found</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BountyPrograms;
