import React from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

// https://tailwindcomponents.com/

import Image from "next/image";
import dxc from "../../../../public/assets/dxc.jpg";
import development from "./development.jpg";

const stats = [
  { id: 1, name: "Countries", value: "70+" },
  { id: 2, name: "Employees", value: "130,000+" },
  { id: 3, name: "Customers in the Fortune 500", value: "240+" },
];
const Content = () => {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-900">
                  WEB DEVELOPMENT
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight purple-header-links sm:text-4xl">
                  "We develop your IT solutions!"{" "}
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  WHATEVER YOUR SECTOR OF ACTIVITY, WE ADVISE YOU AND CARRY OUT
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src={development}
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Whether it's a distributed IT architecture or a complex web
                  application and of course a simple showcase site, we implement
                  above all a rigorous methodology that brings our customers
                  full satisfaction. Avoid going back and forth between
                  different providers. At IT Services, we bring together all the
                  skills within the same agency and offer a global solution that
                  includes all the following services
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        Research and creation of the graphic line.
                      </strong>{" "}
                      involve conducting thorough research and analysis to
                      gather insights about the target audience, competitors,
                      and industry trends. This information is then used to
                      develop a unique and visually appealing graphic line for
                      the website. This process includes the selection of color
                      schemes, typography, imagery
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        Development of the website.
                      </strong>{" "}
                      Website development encompasses the process of creating
                      and building a functional website. It involves tasks such
                      as planning, designing, coding, and testing to bring a
                      website to life. This includes defining the website's
                      purpose, layout, content, and features, as well as
                      ensuring its usability, responsiveness, and compatibility
                      across different devices and browsers. The development
                      phase aims to transform the design concept into a fully
                      functional website that meets the client's requirements
                      and provides an engaging user experience
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        Installation of a latest generation CMS.
                      </strong>{" "}
                      involves setting up and configuring a modern CMS platform
                      to manage website content. This includes selecting the
                      appropriate CMS, preparing the hosting environment, and
                      executing the installation process. The goal is to
                      establish a robust and user-friendly CMS system that
                      allows for easy content creation, editing, and publishing,
                      ultimately enhancing the website's functionality and
                      scalability.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        Hosting on secure servers and daily backups.
                      </strong>{" "}
                      involves storing a website's files and data on secure
                      servers with strong security measures in place. Regular
                      backups are performed to ensure that data is protected and
                      can be restored in case of any unforeseen issues or data
                      loss. This ensures the safety and availability of the
                      website and its data, providing peace of mind to website
                      owners and users.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        Creation and management of e-mail boxes.
                      </strong>{" "}
                      involve the process of setting up and managing email
                      accounts associated with a domain. This includes creating
                      email addresses, configuring email servers, and managing
                      email settings such as forwarding, filtering, and storage.
                      It enables businesses and individuals to have personalized
                      and professional email addresses, facilitating effective
                      communication and organization of emails.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        Advice, support and training
                      </strong>{" "}
                      encompass the provision of guidance, assistance, and
                      education to individuals or organizations. This includes
                      offering expert advice, addressing queries or concerns,
                      providing technical support, and conducting training
                      sessions. The aim is to empower clients or users with the
                      knowledge and skills needed to make informed decisions,
                      troubleshoot issues, and effectively utilize products,
                      services, or systems.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      className="mt-1 h-5 w-5 flex-none purple-header-links"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold purple-header-links">
                        On-page optimization for search engines (SEO)
                      </strong>{" "}
                      nvolves implementing various strategies and techniques
                      directly on a website to improve its visibility and
                      ranking in search engine results. This includes optimizing
                      website content, meta tags, URLs, headings, images, and
                      internal linking structure. The goal is to make the
                      website more search engine-friendly, ensuring that it is
                      easily discoverable, relevant, and authoritative in order
                      to attract organic traffic and enhance its overall online
                      presence.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
