import Provider from "@/Provider/Provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/**
 * Defines the metadata for the DeBountify application.
 * @typedef {Object} Metadata
 * @property {string} title - The title of the application.
 * @property {string} description - The description of the application.
 */

/**
 * The metadata for the DeBountify application.
 * @type {Metadata}
 */
export const metadata = {
  title: "DeBountify: Decentralized Bug Bounty Platform",
  description:
    "DeBountify is a decentralized bug bounty platform that allows developers to incentivize security researchers to find and report vulnerabilities in their code. Built on blockchain technology, DeBountify provides a secure and transparent platform for bug bounties.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="overflow-x-hidden min-h-screen">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
