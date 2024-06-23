import React from "react";

const Programs = () => {
  const cardsData = [
    {
      id: 3,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 3",
      description:
        "Sample description for card 3Sample description for card 3Sample description for card 3",
      tags: ["Functional Bugs", "Security Vulnerabilities"],
      date: "2023-12-19",
      solved: true,
      bountyAmount: "$75",
      severity: "High",
    },
    {
      id: 4,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 4",
      description:
        "Sample description for card 4Sample description for card 4Sample description for card 4",
      tags: ["Memory Bugs", "Storage Bugs"],
      date: "2023-12-20",
      solved: false,
      bountyAmount: "$90",
      severity: "Medium",
    },
    {
      id: 5,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 5",
      description:
        "Sample description for card 5Sample description for card 5Sample description for card 5",
      tags: ["UI/UX Bugs", "Performance Bugs"],
      date: "2023-12-21",
      solved: true,
      bountyAmount: "$120",
      severity: "High",
    },
    {
      id: 6,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 6",
      description:
        "Sample description for card 6Sample description for card 6Sample description for card 6",
      tags: ["Error Handling Bugs", "Input Validation Bugs"],
      date: "2023-12-22",
      solved: false,
      bountyAmount: "$80",
      severity: "Low",
    },
    {
      id: 7,
      imageUrl:
        "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg",
      title: "Bounty Card 7",
      description:
        "Sample description for card 7Sample description for card 7Sample description for card 7",
      tags: ["Concurrency Bugs", "Memory Bugs"],
      date: "2023-12-23",
      solved: true,
      bountyAmount: "$110",
      severity: "High",
    },
  ];

  const colors = [
    "bg-pink-500 text-white",
    "bg-green-500 text-white",
    "bg-blue-500 text-white",
  ];
  let colorIndex = 0;

  return (
    <div className="container mx-auto px-4">
      <p className="text-center mt-7 text-xl font-semibold">Bounty Programs</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="rounded-lg shadow-md overflow-hidden bg-white relative"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-36 object-cover"
            />
            <span
              className={`${
                card.solved ? "text-green-600" : "text-red-600"
              } absolute left-2 top-2 bg-white border text-sm border-gray-300 px-2 py-1 rounded font-semibold`}
            >
              {card.solved ? "Solved" : "Unresolved"}
            </span>
            <div className="p-3">
              <h3 className="text-lg text-gray-600 mb-1 font-semibold">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-2 text-sm">{card.description}</p>

              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Date:</span> {card.date}
                </p>
                <p>
                  <span className="font-semibold">Bounty Amount:</span>{" "}
                  {card.bountyAmount}
                </p>
                <p>
                  <span className="font-semibold">Severity:</span>{" "}
                  {card.severity}
                </p>
                <div className="flex flex-wrap mt-2">
                  {card.tags.map((tag, index) => {
                    const tagStyle = colors[colorIndex % colors.length];
                    colorIndex++;
                    return (
                      <span
                        key={index}
                        className={`tag ${tagStyle} text-black px-2 py-1 rounded-3xl text-xs mr-2 mb-2`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
