import React from "react";
import SocialIcons from "../common/SocialIcons";
import Link from "next/link";
import ChainLayer from "../common/ChainLayer";

const Footer = () => {
  const address =
    "Trimurti Palace II, Near Zeal College Chowk, Narhe Pune, 411041";
  const phone = "+91 9999999999";
  const email = "info@debountify.com";
  const social = [
    {
      icon: "ic:baseline-facebook",
      url: "https://facebook.com/debountify",
    },
    {
      icon: "mdi:twitter",
      url: "https://twitter.com/debountify",
    },
    {
      icon: "mdi:instagram",
      url: "https://instagram.com/debountify",
    },
    {
      icon: "mdi:linkedin",
      url: "https://linkedin.com/debountify",
    },
    {
      icon: "mdi:github",
      url: "https://github.com/debountify",
    },
  ];

  const navigation = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Hacker",
      url: "/hacker",
    },
    {
      name: "Company",
      url: "/company",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];
  return (
    <div className="pt-4 relative">
        <ChainLayer img={"footer_right.svg"} className="left-[80vw] top-5 opacity-80 h-52" />
        <ChainLayer img={"footer_left.svg"} className="right-[80vw] bottom-0 opacity-80" />
      <div className="bg-white/10 backdrop-blur-sm rounded-t-2xl">
        <div className="grid grid-cols-2 p-4 gap-8">
          <div className="flex flex-col justify-center text-white gap-2">
            <div className="text-4xl marck">DeBountify</div>
            <p className="text-justify text-sm">
              Welcome to our decentralized bug bounty platform, where innovation
              meets security. Our mission is to revolutionize the way
              vulnerabilities are discovered and resolved in the digital world.
              We believe in the power of the community, and that's why we've
              built a platform that empowers ethical hackers, developers, and
              security enthusiasts to collaborate seamlessly. With our platform,
              you can report and tackle security vulnerabilities in a
              transparent, decentralized, and rewarding manner.
            </p>
            <div className="flex items-center gap-2 py-2 pt-4">
              {social.map((item, index) => (
                <SocialIcons
                  key={index}
                  url={item.url}
                  icon={item.icon}
                  className="text-white text-2xl"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col text-white gap-2">
              <h3 className="text-xl">Navigation</h3>
              <div className="flex flex-col gap-2">
                {navigation.map((item, index) => (
                <Link className="transition-all hover:text-text_body hover:pl-2 hover:font-semibold" key={index} href={item.url}>{item.name}</Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col text-white gap-2">
              <h3 className="text-xl">Contact Info</h3>
              <div className="flex flex-col gap-2">
                <p>{address}</p>
                <p>Phone: +91 {phone}</p>
                <p>
                  <Link className="transition-all hover:text-blue-400" href={`mailto:${email}`}>Email: {email}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
