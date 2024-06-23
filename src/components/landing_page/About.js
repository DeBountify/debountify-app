import React from "react";
import IconTemplate from "../icons/IconTemplate";

const About = () => {
  return (
    <div>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <p className="font-normal text-lg leading-3 text-gray-200 dark:text-indigo-500 cursor-pointer pb-2">
          About
        </p>
        <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
          <div className="w-full lg:w-6/12">
            <h2 className="w-full text-gray-100 font-bold lg:text-3xl text-2xl lg:leading-10 dark:text-gray-200 leading-9">
              Innovative cybersecurity: Blockchain rewards, fortified defenses.
            </h2>
            <p className="font-normal text-lg text-justify leading-6 text-gray-200 dark:text-gray-200 mt-6">
              At Debountify, we are committed to transforming the landscape of
              bug bounty programs through innovative use of blockchain
              technology. Our mission is to provide a transparent, fair, and
              efficient platform that empowers companies to launch bug bounty
              programs with confidence, while offering security researchers fair
              compensation for their invaluable contributions.
            </p>
          </div>
          <div className="w-full lg:w-6/12">
            <img
              className="w-[80%] float-right"
              src="/images/selecting_team.svg"
              alt="people discussing on board"
            />
          </div>
        </div>
        {/* Our values */}
        <div>
          <h2 className="font-bold lg:text-4xl text-3xl text-gray-300 dark:text-gray-200">
            Our Values
          </h2>

          <div className="relative mt-6">
            <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
              <div className="z-20 w-12 h-12 bg-purple-800 rounded-full flex justify-center items-center">
                <IconTemplate
                  icon="game-icons:strong"
                  className="text-white text-3xl z-20 sm:block hidden"
                />
              </div>
              <div className="z-20 w-12 h-12 bg-purple-800 rounded-full flex justify-center items-center">
                <IconTemplate
                  icon="fa-solid:hand-holding-water"
                  className="text-white text-3xl z-20 sm:block hidden"
                />
              </div>
              <div className="z-20 w-12 h-12 bg-purple-800 rounded-full flex justify-center items-center">
                {" "}
                <IconTemplate
                  icon="icon-park-outline:respect"
                  className="text-white text-3xl z-20 sm:block hidden"
                />
              </div>
            </div>
            <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
          <div>
            <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-300 dark:text-gray-200 mt-6">
              Simple is strong
            </p>
            <p className="font-normal text-base leading-6 text-gray-200 dark:text-gray-200 mt-6">
              We approach every project with the goal of finding the simplest,
              strongest solution possible.
            </p>
          </div>
          <div>
            <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-200 dark:text-gray-200 mt-6">
              Transparent disclosure
            </p>
            <p className="font-normal text-base leading-6 text-gray-200 dark:text-gray-200 mt-6">
              Upholding integrity in our practices. We believe in transparency
              and honesty in all our dealings.
            </p>
          </div>
          <div className="sm:block hidden">
            <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-200 dark:text-gray-200 mt-6">
              Respect all people
            </p>
            <p className="font-normal text-base leading-6 text-gray-200 dark:text-gray-200 mt-6">
              Embracing Diversity, Fostering Respect: Building Stronger
              Cyber-Community Together.
            </p>
          </div>
        </div>
        <div className="sm:hidden block relative mt-8">
          <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg3.svg"
              alt="user"
            />
          </div>
          <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
        </div>
        <div className="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
          <div>
            <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-gray-200 mt-6">
              400k User
            </p>
            <p className="font-normal text-base leading-6 text-gray-200 dark:text-gray-200 mt-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
          <div className="w-full lg:w-6/12">
            <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-300 dark:text-gray-200">
              Our Mission
            </h2>
            <p className="font-normal text-base text-justify leading-6 text-gray-200 dark:text-gray-200 mt-6 w-full lg:w-12/12 xl:w-11/12">
              Our mission is to revolutionize bug bounty programs by harnessing
              the power of blockchain technology. We're committed to providing a
              transparent, fair, and efficient platform that empowers companies
              to launch bug bounty programs confidently. Through our innovative
              approach, we ensure security researchers receive equitable
              compensation for their contributions, addressing longstanding
              issues like delayed payments and disputes over rewards.{" "}
            </p>
            <p className="font-normal text-base text-justify leading-6 text-gray-200 dark:text-gray-200 w-full lg:w-12/12 xl:w-11/12 mt-4">
              By leveraging blockchain, smart contracts, and an escrow system,
              we streamline the bug bounty process while enhancing security and
              trust within the cybersecurity community. Our platform fosters
              collaboration between companies and researchers, creating a safer
              digital environment where vulnerabilities are swiftly identified
              and mitigated. Join us as we reshape the future of bug bounty
              programs, fortifying cybersecurity measures and advancing towards
              a more secure digital landscape{" "}
            </p>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
              <div className="flex p-4 shadow-md bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="mr-6">
                  <IconTemplate
                    icon="ri:team-fill"
                    className="text-white text-2xl"
                  />
                </div>
                <div className="">
                  <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-200 dark:text-gray-200">
                    Team
                  </p>
                  <p className="mt-2 font-normal text-base leading-6 text-gray-200 dark:text-gray-200">
                    Meet the Team Behind the Future of Bug Bounty: Driven,
                    Experienced, and Dedicated to Cybersecurity Excellence
                  </p>
                </div>
              </div>

              <div className="flex p-4 shadow-md bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="mr-6">
                  <IconTemplate
                    icon="material-symbols:security"
                    className="text-white text-2xl"
                  />
                </div>
                <div className="">
                  <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-200 dark:text-gray-200">
                    Security
                  </p>
                  <p className="mt-2 font-normal text-base leading-6 text-gray-200 dark:text-gray-200">
                    Ensuring Cybersecurity Integrity: Our Commitment to
                    Protecting Digital Assets and Building Trust in a Connected
                    World.
                  </p>
                </div>
              </div>

              <div className="flex p-4 shadow-md bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="mr-6 text-white">
                  <IconTemplate
                    icon="fa6-solid:handshake"
                    className="text-white text-2xl"
                  />
                </div>
                <div className="">
                  <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-200 dark:text-gray-200">
                    Trust
                  </p>
                  <p className="mt-2 font-normal text-base leading-6 text-gray-200 dark:text-gray-200">
                    Trust in cybersecurity innovation with our
                    blockchain-powered bug bounty platform. Securely reward bug
                    hunters while fortifying digital defenses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
