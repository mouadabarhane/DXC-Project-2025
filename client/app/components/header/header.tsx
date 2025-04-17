"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useState, useEffect, ReactComponentElement } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import dxc from "../../../public/assets/dxc.jpg";

const ITServiceLinks = [
  {
    name: "Development",
    description:
      "Creating software applications or systems it involves activities such as coding, testing, and deployment to meet project requirements and bring ideas to life.",
    href: "/it-service/development",
    icon: ChartPieIcon,
  },
  {
    name: "Cloud Computing",
    description: "Speak directly to your customers",
    href: "/it-service/cloud-computing",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "SSL Certification",
    description: "Your customers’ data will be safe and secure",
    href: "/it-service/ssl-certification",
    icon: FingerPrintIcon,
  },
  {
    name: "Backup Solution",
    description: "Connect with third-party tools",
    href: "/it-service/backup-solution",
    icon: SquaresPlusIcon,
  },
];
const ITIndustryLinks = [
  {
    name: "Integration",
    description: "Get a better understanding of your traffic",
    href: "/it-industry/integration",
    icon: ChartPieIcon,
  },
  {
    name: "Wifi Survey",
    description: "Speak directly to your customers",
    href: "/it-industry/wifi-survey",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Stress testing & modelisation",
    description: "Your customers’ data will be safe and secure",
    href: "/it-industry/stress-testing-and-modelisation",
    icon: FingerPrintIcon,
  },
];
const login = { icon: UserCircleIcon };
const callsToAction = [
  { name: "Watch Youtube Channel", href: "#", icon: PlayCircleIcon },
  { name: "Contact ", href: "#", icon: PhoneIcon },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type propsType = {
  linksColor?: string;
};

export default function Header(props: { styleElements: propsType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let tokenUser;
    let user;
    tokenUser = localStorage.getItem("token") || "";
    setToken(tokenUser);

    user = localStorage.getItem("user") || "";
    setUsername(user);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to Logout!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#5f249f",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      }
    });
  };

  return (
    <header>
      <nav
        className="mx-auto flex items-center justify-between p-4 lg:px-12"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 ">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">DXC TECHNOLOGY MAROC</span>
            <Image className="h-20 w-auto" src={dxc} alt="logo" />
          </Link>
        </div>

        <div className="flex">
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className={"h-6 w-6 " + props.styleElements.linksColor}
                aria-hidden="true"
              />
            </button>
          </div>

          <Popover.Group className="items-center hidden lg:flex lg:gap-x-12">
            <Link
              href="/"
              className={"text-md leading-6 " + props.styleElements.linksColor}
            >
              Home
            </Link>
            <Popover className="relative">
              <Popover.Button
                className={
                  "flex items-center gap-x-1 text-md  leading-6 " +
                  props.styleElements.linksColor
                }
              >
                IT Service
                <ChevronDownIcon
                  className={
                    "h-5 w-5 flex-none " + props.styleElements.linksColor
                  }
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {ITServiceLinks.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-purple-800 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-white group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-purple-800"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-purple-800">
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-gray-100"
                      >
                        <item.icon
                          className="h-5 w-5 flex-none text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            <Popover className="relative">
              <Popover.Button
                className={
                  "flex items-center gap-x-1 text-md  leading-6 " +
                  props.styleElements.linksColor
                }
              >
                IT Industry
                <ChevronDownIcon
                  className={
                    "h-5 w-5 flex-none " + props.styleElements.linksColor
                  }
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {ITIndustryLinks.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-purple-800 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-white group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-purple-800"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-purple-800">
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-gray-100"
                      >
                        <item.icon
                          className="h-5 w-5 flex-none text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <Link
              href="/about"
              className={"text-md leading-6 " + props.styleElements.linksColor}
            >
              About US
            </Link>
            <Link
              href="/contact"
              className={"text-md  leading-6 " + props.styleElements.linksColor}
            >
              Contact Us
            </Link>
          </Popover.Group>
          <div className=" ms-8  lg:flex lg:flex-1 lg:justify-end">
            {token && username ? (
              <Link
                href=""
                onClick={handleLogout}
                className={
                  "text-md  leading-6 " + props.styleElements.linksColor
                }
              >
                Logout
              </Link>
            ) : (
              <Link href="/login" className="text-md  leading-6 text-white">
                <login.icon
                  className={"h-10 w-10 " + props.styleElements.linksColor}
                />
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image className="h-14 w-auto" src={dxc} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        IT Service
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...ITServiceLinks, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        IT Industrie
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...ITIndustryLinks, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact US
                </Link>
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </Link>
              </div>
              <div className="py-6">
                {token && username ? (
                  <Link
                    href=""
                    onClick={handleLogout}
                    className={
                      "text-md leading-6 " + props.styleElements.linksColor
                    }
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    href="login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base  leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <login.icon className="h-32 w-32 " />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
