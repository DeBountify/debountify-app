import React from "react";
import { DropdownMenuDemo } from "./Dropdown";
import { DropdownMenuDemo2 } from "./Profile";
import GradientButton from "@/components/common/GradientButton";
import { useSelector } from "react-redux";
import Disconnect from "@/components/common/Disconnect";

const Navbar = ({ setIsOpen, isOpen }) => {
  const { userState } = useSelector((state) => state.user);

  return (
    <header className="z-10 py-3 bg-[#0F123F] shadow-md relative">
      <div className="flex items-center justify-between h-full px-6 mx-auto text-white ">
        <div>
          <div className="marck text-4xl">DeBountify</div>
          {/* <Image src={logoUrl} alt="Debountify Logo" height={50} width={50} className="h-10" /> */}
        </div>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="gradient_34v3e">
            <Disconnect />
          </li>

          {/* Notifications menu */}
          <li>
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <DropdownMenuDemo />
            </button>
            {/* Notifications menu content */}
          </li>

          {/* Profile menu */}
          <li>
            <button
              className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
              aria-haspopup="true"
            >
              <DropdownMenuDemo2 />
            </button>
            {/* Profile menu content */}
          </li>

          <li>
            <button
              className="class_drawer2 opacity-[100]  text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
