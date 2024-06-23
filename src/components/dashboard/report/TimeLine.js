import React from "react";

const TimeLine = () => {
  return (
    <div>
      {" "}
      <h1 className="py-5"> Timeline:</h1>
      <ol className="relative border-s pt-6 border-gray-700">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-gray-900 bg-blue-900">
            <img
              className="rounded-full shadow-lg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
              alt="Thomas Lean image"
            />
          </span>
          <div className="p-4  border  rounded-lg shadow-sm bg-opacity-5 bg-white backdrop-blur-xl border-gray-600">
            <div className="items-center justify-between mb-3 sm:flex">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                2 hours ago
              </time>
              <div className="text-sm font-normal   lex text-gray-300">
                Thomas Lean commented on{" "}
                <a
                  href="#"
                  className="font-semibold text-white hover:underline"
                >
                  DeBountify
                </a>
              </div>
            </div>
            <div className="p-3 text-xs italic font-normal   border  rounded-lg  bg-opacity-5 bg-white  border-gray-500 text-gray-300">
              Hi ya'll! I wanted to share a webinar zeroheight is having
              regarding how to best measure your design system! This is the
              second session of our new webinar series on #DesignSystems
              discussions where we'll be speaking about Measurement.
            </div>
          </div>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-gray-900 bg-blue-900">
            <img
              className="rounded-full shadow-lg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
              alt="Thomas Lean image"
            />
          </span>
          <div className="p-4  border  rounded-lg shadow-sm bg-opacity-5 bg-white backdrop-blur-xl border-gray-600">
            <div className="items-center justify-between mb-3 sm:flex">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                2 hours ago
              </time>
              <div className="text-sm font-normal   lex text-gray-300">
                Thomas Lean commented on{" "}
                <a
                  href="#"
                  className="font-semibold text-white hover:underline"
                >
                  DeBountify
                </a>
              </div>
            </div>
            <div className="p-3 text-xs italic font-normal   border  rounded-lg  bg-opacity-5 bg-white  border-gray-500 text-gray-300">
              Hi ya'll! I wanted to share a webinar zeroheight is having
              regarding how to best measure your design system! This is the
              second session of our new webinar series on #DesignSystems
              discussions where we'll be speaking about Measurement.
            </div>
          </div>
        </li>
        <li className="ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-gray-900 bg-blue-900">
            <img
              className="rounded-full shadow-lg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
              alt="Jese Leos image"
            />
          </span>
          <div className="items-center justify-between p-4 bg-white border  rounded-lg shadow-sm sm:flex bg-opacity-5 backdrop-blur-xl border-gray-600">
            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
              1 day ago
            </time>
            <div className="text-sm font-normal text-gray-300">
              Jese Leos has changed{" "}
              <a
                href="#"
                className="font-semibold  dartext-blue-500 hover:underline"
              >
                Pricing page
              </a>{" "}
              task status to{" "}
              <span className="font-semibold  text-white">Finished</span>
            </div>
          </div>
        </li>
      </ol>
      <h1 className="pt-12 pb-6"> Issue Timeline:</h1>
      <table className="min-w-full divide-y py-6">
        <thead className="text-white  backdrop-blur-sm bg-white/5">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase "
            >
              Date Time (UTC)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="px-6 py-4 text-base whitespace-nowrap">
              2020-02-10 15:13
            </td>
            <td className="px-6 py-4 text-base whitespace-wrap">
              Software containing vulnerability deployed to production.
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-base whitespace-nowrap">
              2020-02-11 05:53
            </td>
            <td className="px-6 py-4 text-base whitespace-wrap">
              Vulnerability submitted to HackerOne’s bug bounty program.
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="pt-12 pb-1"> Root Cause:</h1>
      <div className="text-lg pt-4 pb-7">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
};

export default TimeLine;
