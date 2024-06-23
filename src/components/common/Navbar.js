import Link from "next/link";
import React from "react";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-2 px-4">
      <div className="text-4xl text-white marck">
        <Link href="/">DeBountify</Link>
      </div>
      <div>
        <ul className="flex flex-row items-center gap-4 text-white">
          <li className="text-lg hover:text-text_body transition-colors">
            <Link href="/">Home</Link>
          </li>
          <li className="text-lg hover:text-text_body transition-colors">
            <Link href="/login">Hacker</Link>
          </li>
          <li className="text-lg hover:text-text_body transition-colors">
            <Link href="/login">Company</Link>
          </li>
          <li className="text-lg hover:text-text_body transition-colors">
            <Link href="/about">About</Link>
          </li>
          <li className="text-lg hover:text-text_body transition-colors">
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </nav>
  );
};

export default Navbar;
