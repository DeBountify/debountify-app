import React from "react";
import ChainLayer from "../common/ChainLayer";
import FeaturesBox from "../common/FeaturesBox";

const Features = () => {
  const data = [
    {
      title: "$8000m+",
      description: "Valid vulnerabilities resolved till date",
    },
    { title: "10000+", description: "Clicks per week" },
    {
      title: "2000+",
      description: "Ethical hackers registered on the platform",
    },
    { title: "1000+", description: "Organizations registered on the platform" },
  ];

  const features = [
    { text: "Escrow Service", icon: "clarity:block-line", class: "rounded-ss-lg rounded-ee-lg" },
    { text: "Smart Contract Integration", icon: "eos-icons:blockchain", class: "rounded-se-lg rounded-es-lg" },
    { text: "Community Voting", icon: "iconoir:community", class: "rounded-ss-lg rounded-ee-lg" },

  ]
  return (
    <div className="py-4 relative">
      <ChainLayer className="-right-24 top-0 opacity-40" />
      <div className="grid grid-cols-4 text-white">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-start p-2 ${
              index === 3 ? "" : "border-r-2 border-text_body"
            }`}
          >
            <h2 className="marck text-3xl">{item.title}</h2>
            <h2 className="text-text_body">{item.description}</h2>
          </div>
        ))}
      </div>
      <ChainLayer
        img="dotted_design.png"
        className="right-44 top-36 opacity-30 h-36 w-36"
      />
      <div className="flex flex-col justify-center items-center py-8 gap-3">
        <div className="border-2 border-text_body rounded-full p-3 text-text_body hover:border-white hover:bg-text_body hover:text-white transition-all">
          Our Features
        </div>
        <h2 className="text-text_body text-2xl">Our Some features</h2>
        <div className="grid grid-cols-3 gap-4">
          {features.map((item, index) => (
          <FeaturesBox key={index} text={item.text} className={item.class} icon={item.icon}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
