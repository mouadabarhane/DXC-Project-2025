// Importing components
import Image from "next/image";

// Importing icons
import { LockClosedIcon } from "@heroicons/react/20/solid";

// Importing assets
import wifi1 from "../../../../public/assets/wifi-survey1.jpg";
import wifi2 from "../../../../public/assets/wifi-survey2.jpg";

const features = [
  {
    name: "Comprehensive Site Analysis:",
    description:
      " Our solution provides a thorough site analysis to assess your existing WiFi infrastructure and identify areas of improvement. We conduct a detailed survey of your premises, taking into account factors such as building layout, construction materials, interference sources, and user density. This analysis allows us to create a customized WiFi deployment plan tailored to your specific needs.",
    icon: LockClosedIcon,
  },
  {
    name: "Coverage Optimization",
    description:
      " Our WiFi Survey solution ensures optimal coverage throughout your premises. We strategically place access points to maximize signal strength and minimize dead zones, ensuring seamless connectivity across all areas, including offices, meeting rooms, common areas, and outdoor spaces. This comprehensive coverage promotes productivity and user satisfaction.",
    icon: LockClosedIcon,
  },
  {
    name: "Performance and Capacity Planning:",
    description:
      " We analyze your network requirements and user demands to determine the optimal configuration and capacity of your WiFi network. By considering factors such as bandwidth requirements, concurrent connections, and network traffic patterns, we design a robust and scalable WiFi infrastructure that can handle your current and future needs.",
    icon: LockClosedIcon,
  },
  {
    name: "Interference Mitigation:",
    description:
      "Our WiFi Survey solution addresses potential sources of interference that can degrade network performance. We identify and mitigate sources of interference, such as neighboring WiFi networks, electronic devices, and physical obstacles. This ensures a clean and reliable wireless signal, minimizing disruptions and maximizing network stability.",
    icon: LockClosedIcon,
  },
  {
    name: "User Experience Optimization:",
    description:
      " Our solution focuses on delivering an exceptional user experience. We consider factors such as signal strength, network latency, and throughput to optimize WiFi performance. By providing reliable and fast connectivity, we enhance user productivity, satisfaction, and engagement. ",
    icon: LockClosedIcon,
  },
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
                  Wifi Survey
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
              src={wifi1}
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Survey solution offers a comprehensive set of features and
                  benefits designed to optimize WiFi network performance,
                  coverage, and user experience.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  {features.map((listItem) => {
                    return (
                      <li className="flex gap-x-3">
                        <LockClosedIcon
                          className="mt-1 h-5 w-5 flex-none purple-header-links"
                          aria-hidden="true"
                        />
                        <span>
                          <strong className="font-semibold purple-header-links">
                            {listItem.name}
                          </strong>{" "}
                          {listItem.description}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>

            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Boost your productivity.
                <br />
                Start collaborate with us.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Stress Testing & Modeling Industrie IT solution offers a
                comprehensive set of features and benefits designed to assess
                and optimize the performance, reliability, and scalability of IT
                systems within industrial environments.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <Image
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src={wifi2}
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
