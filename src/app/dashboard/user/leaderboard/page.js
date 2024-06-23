"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { hackerUserState } = useSelector((state) => state.user);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("srNo");
  const [data, setData] = useState(hackerUserState);

  // const sortedData = data.sort((a, b) => {
  //   const valueA =
  //     typeof a[sortColumn] === "string"
  //       ? a[sortColumn]
  //       : a[sortColumn].toString();
  //   const valueB =
  //     typeof b[sortColumn] === "string"
  //       ? b[sortColumn]
  //       : b[sortColumn].toString();

  //   const comparison = valueA.localeCompare(valueB);

  //   return sortOrder === "asc" ? comparison : -comparison;
  // });

  const handleSort = (column) => {
    setSortOrder(
      sortColumn === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);
    if (sortOrder === "asc") {
      setData(
        hackerUserState?.sort(
          (a, b) => a?.account.hitPoints - b?.account.hitPoints
        )
      );
    } else {
      setData(
        hackerUserState?.sort(
          (a, b) => b?.account.hitPoints - a?.account.hitPoints
        )
      );
    }
  };

  useEffect(() => {
    setData(
      hackerUserState?.sort(
        (a, b) => b?.account.hitPoints - a?.account.hitPoints
      )
    );
  }, [hackerUserState]);
  return (
    <div className="relative  h-[88vh] overflow-y-auto sticky-top">
      <div className="relative rounded-xl shadow-md w-11/12 h-auto mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-blur-lg"></div>
        <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
        <div className="p-6 px-0 ">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="w-[7vw] bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Rank
                  </p>
                </th>
                <th className="w-[15vw] bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Name{" "}
                  </p>
                </th>
                <th className="w-[25vw] bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Total Submissions
                  </p>
                </th>
                <th
                  className="w-[10vw] cursor-pointer   bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={() => handleSort("hitPoints")}
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Points
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item, i) => (
                <tr key={i}>
                  <td className="p-4   ">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          {i + 1}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4   ">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          process.env.PINATA_VIEW_API + item?.account?.userImage
                        }
                        alt={item?.account.userName}
                        className="inline-block relative object-cover object-center  w-9 h-9 rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          {item?.account.userName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4   ">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                        {item?.account?.bugReportSubmissionCount}
                      </p>
                    </div>
                  </td>
                  <td className="p-4   ">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-400 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span className="">{item?.account?.hitPoints}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
