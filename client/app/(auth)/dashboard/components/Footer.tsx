import React from "react";
import Image from "next/image";
import dxc from "../../../../public/assets/dxc_techno.png";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0"
            >
              <Image src={dxc} alt="Flowbite Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-900 sm:mb-0">
              <li>
                <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-white sm:text-center bg-purple-800">
            © 2025{" "}
            <a href="/" className="hover:underline text-white">
              DXC TECHNOLOGY MOROCCO™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
