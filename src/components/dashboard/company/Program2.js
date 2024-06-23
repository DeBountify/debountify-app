import React from "react";

const Program2 = () => {
  const cardsData = [
    {
      id: 1,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 3",
      description:
        "on for card 3Sample description for cardSample description for card 3Sample description for card 3Sample description for card 3",
      tags: ["Functional Bugs", "Security Vulnerabilities"],
      date: "2023-12-19",
      startedDate: "11 Dec 2023",
      lastUpdated: "22 Dec 2023",
      submittedReports: 27,
      solved: true,
      bountyAmount: "$75",
      severity: "High",
    },
    {
      id: 2,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 3",
      description:
        "3Sample description for caon for cardSample description for card 3Sample description for card 3Sample description for card 3",
      tags: ["Functional Bugs", "Security Vulnerabilities"],
      date: "2023-12-19",
      startedDate: "11 Dec 2023",
      lastUpdated: "22 Dec 2023",
      submittedReports: 27,
      solved: true,
      bountyAmount: "$75",
      severity: "High",
    },
    {
      id: 3,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 3",
      description:
        "Sample description for card 3Sescription for card 3Sample description for card 3Sample description for cardSample description for card 3Sample description for card 3Sample description for card 3",
      tags: ["Functional Bugs", "Security Vulnerabilities"],
      date: "2023-12-19",
      startedDate: "11 Dec 2023",
      lastUpdated: "22 Dec 2023",
      submittedReports: 27,
      solved: true,
      bountyAmount: "$75",
      severity: "High",
    },
    {
      id: 4,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 3",
      description:
        "Sample description for d 3Sample description for card 3Sample description for cardSample description for card 3Sample description for card 3Sample description for card 3",
      tags: ["Functional Bugs", "Security Vulnerabilities"],
      date: "2023-12-19",
      startedDate: "11 Dec 2023",
      lastUpdated: "22 Dec 2023",
      submittedReports: 27,
      solved: true,
      bountyAmount: "$75",
      severity: "High",
    },
    {
      id: 5,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 3",
      description:
        "Sample description foription for card 3Sample description for card 3Sample description for cardSample description for card 3Sample description for card 3Sample description for card 3",
      tags: ["Functional Bugs", "Security Vulnerabilities"],
      date: "2023-12-19",
      startedDate: "11 Dec 2023",
      lastUpdated: "22 Dec 2023",
      submittedReports: 27,
      solved: true,
      bountyAmount: "$75",
      severity: "High",
    },
  ];
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 13) {
      return words.slice(0, 12).join(" ") + " ...";
    }
    return description;
  };

  let colorIndex = 0;

  return (
    <div className="container mx-auto px-4">
      <p className="text-center mt-7 text-xl font-semibold">Bounty Programs</p>
      <div className="w-full">
        <div className="flex flex-wrap gap-4 mt-8 shadow-md">
          {cardsData.map((card) => (
            <div className="sm:w-screen">
              <div
                key={card.id}
                className="w-full rounded-t-lg shadow-md overflow-hidden bg-opacity-10 flex-col md:p-4 bg-blue-600 backdrop-blur-xl relative flex sm:flex-row"
              >
                <div className="">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="sm:w-32 sm:h-20 object-cover rounded-t-lg"
                  />
                </div>

                <div className="md:py-0 py-4 px-14 md:px-4 flex-1 basis-1/2 flex sm:flex-row flex-col justify-between relative">
                  <div className="flex_program_fe flex-1 sm:basis-1/6">
                    <h3 className="text-lg  mb-1 font-semibold">
                      {card.title}
                    </h3>
                    <p className=" mb-2 text-base h-14 overflow-hidden">
                      {truncateDescription(card.description)}
                    </p>
                  </div>
                  <div className="text-sm md:flex-row flex-1 flex-1/4 sm:ml-4 align-items-end sm:mr-4">
                    <div className="md:flex-col flex-1 text-left">
                      <p className="text-base">
                        <span className="text-slate-300 font-semibold">
                          Started date:
                        </span>{" "}
                        <span>{card.startedDate}</span>
                      </p>
                      <p className="text-base">
                        <span className="text-slate-300 font-semibold">
                          Last updated:
                        </span>{" "}
                        <span> {card.lastUpdated}</span>
                      </p>
                    </div>
                    <p className="text-left text-base">
                      <span className="text-slate-300 font-semibold">
                        Submitted reports:
                      </span>{" "}
                      <span>{card.submittedReports}</span>
                    </p>
                  </div>

                  <div className="md:border-l-2 border-gray-300"></div>
                  <div className="text-sm md:flex-row flex-1 flex-1/4 ">
                    <div className="flex-1 text-end">
                      <p>
                        <span className=" text-lg">up to </span>{" "}
                        <span className="text-3xl"> {card.bountyAmount}</span>
                      </p>
                      <p>
                        <span className=" text-lg ">paid: </span>{" "}
                        {card.bountyAmount}
                      </p>
                      <p>
                        <span className="text-lg">Severity:</span>{" "}
                        {card.severity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-center md:pl-6 md:pr-6">
                <hr className="w-full mx-auto " />
              </div>
              <div className="w-full shadow-md md:pl-4 md:pr-4 md:pb-1 md:pt-1 overflow-hidden rounded-b-lg relative bg-opacity-10 bg-blue-600 backdrop-blur-xl flex md:flex-row">
                <div className="flex flex-wrap  p-2">
                  {card.tags.map((tag, index) => {
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
  );
};

export default Program2;
