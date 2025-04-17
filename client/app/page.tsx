// Importing modules
import Image from "next/image";
import Link from "next/link";

// Importing fonts
import { Poppins } from "next/font/google";

// Importing images
import CompanyImage from "../public/assets/low-angle-view-skyscrapers.jpg";
import InfrastractureImage from "../public/assets/network-engineers-with-tablet-medium-shot.jpg";
import CloudSolutions from "../public/assets/cloud-solution.jpg";
import CyberSecurity from "../public/assets/cybersecurity.jpg";
import SapLogo from "../public/assets/sap.png";
import ServiceNowLogo from "../public/assets/ServiceNow_logo.png";
import GoogleCloudLogo from "../public/assets/Google_Cloud_logo.png";
import RedHatLogo from "../public/assets/red-hat.jpg";
import SalesForce from "../public/assets/Salesforce.com_logo.png";

// Importing components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HeaderSection from "./components/headerSection";

// Importing styles
import homeStyles from "./home.module.css";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const stats = [
  { id: 1, name: "Countries", value: "70+" },
  { id: 2, name: "Employees", value: "130,000+" },
  { id: 3, name: "Customers in the Fortune 500", value: "240+" },
];

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];

export default function Home() {
  return (
    <main className={homeStyles.home + " " + homeStyles["poppins-font"]}>
      <Header styleElements={{ linksColor: "white-header-links" }} />

      <div
        className={
          homeStyles.container + " " + poppins.className + " container mx-auto "
        }
      >
        <h1 className="text-8xl font-semibold text-gray-400">Welcome to</h1>
        <h2 className=" mt-5 text-3xl text-purple-700 font-semibold">
          DXC TECHNOLOGY MAROC,
        </h2>
        <p className="mt-6 text-md ">
          Where technology meets innovation. We are a leading IT company <br />
          dedicated to providing cutting-edge solutions and services <br />
          to empower businesses and individuals in the digital age.
        </p>
        <button className="mt-6 w-1/6 flex rounded-full items-center justify-center text-center bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 bg-white text-white px-4 py-3 rounded text-md space-x-2 transition duration-100">
          Learn more
        </button>
      </div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:pt-64 lg:pb-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Turning ideas into action
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-medium">
              Unlock the power of technology with DXC Technology | MOROCCO the
              leading provider of comprehensive IT solutions for businesses of
              all sizes. With a passion for innovation and a commitment to
              excellence, we empower organizations to thrive in the digital age.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div
        className={
          "text-gray-900 pt-12 pr-0 pb-14 pl-0 " +
          homeStyles["home-under-section"]
        }
      >
        <div
          className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl"
        >
          <div className="flex flex-col items-center sm:px-5 md:flex-row">
            <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
              <div
                className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5"
              >
                <div
                  className={
                    homeStyles.tag +
                    " flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2 uppercase"
                  }
                >
                  <p className="inline">
                    <svg
                      className="w-3.5 h-3.5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                  0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </p>
                  <p className="inline text-xs font-medium">New</p>
                </div>
                <div className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">
                  Tailored IT Solutions to Propel Your Business Forward
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="block">
                <Image
                  src={CompanyImage}
                  className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"
                  alt="DXC Company"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
              <Image
                src={InfrastractureImage}
                className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-"
                alt="Infrastructure Solutions"
              />
              <p
                className={
                  homeStyles.tag +
                  " flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase"
                }
              >
                Infrastracture
              </p>
              <div className="text-lg font-bold sm:text-xl md:text-2xl">
                IT Infrastructure Management
              </div>
              <p className="text-md text-black">
                We provide end-to-end management of your IT infrastructure,
                including network design and implementation, server
                administration, data storage solutions, and proactive
                maintenance
              </p>
            </div>
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
              <Image
                src={CloudSolutions}
                className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-"
                alt="Cloud Solutions"
              />
              <p
                className={
                  homeStyles.tag +
                  " flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase"
                }
              >
                Cloud
              </p>
              <div className="text-lg font-bold sm:text-xl md:text-2xl">
                Cloud Solutions
              </div>
              <p className="text-md text-black">
                Harness the power of the cloud with our comprehensive range of
                cloud services, including cloud migration, infrastructure as a
                service (IaaS), software as a service (SaaS), and cloud security
                solutions.
              </p>
            </div>
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
              <Image
                src={CyberSecurity}
                className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-"
                alt="Cyber Security"
              />
              <p
                className={
                  homeStyles.tag +
                  " flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase"
                }
              >
                Security
              </p>
              <div className="text-lg font-bold sm:text-xl md:text-2xl">
                Cybersecurity
              </div>
              <p className="text-sm text-black">
                Protect your valuable data and digital assets with our robust
                cybersecurity solutions. We offer proactive threat detection,
                vulnerability assessments, firewall management, data encryption,
                and employee training to ensure your business remains secure
                against evolving cyber threats.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative isolate overflow-hidden bg-purple-900 py-24 sm:py-32">
        {/* <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        /> */}
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Work with us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Work with us and join our dynamic IT enterprise, where innovation,
              collaboration, and endless opportunities await.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-300">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold leading-8 text-gray-900 py-8">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={SapLogo}
              alt="SAP Logo"
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={ServiceNowLogo}
              alt="ServiceNow"
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={GoogleCloudLogo}
              alt="Google Cloud"
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src={RedHatLogo}
              alt="Red Hat"
            />
            <Image
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src={SalesForce}
              alt="Salesforce"
            />
          </div>
        </div>
      </div>
      <div className="bg-primary-purple h-24 flex items-center">
        <div className="container mx-auto flex justify-between">
          <h2 className="text-white text-3xl">Connect with DXC</h2>
          <Link href="/contact">
            <div className="border-2 border-white text-white py-2 px-5 text-1xl uppercase font-medium">
              Contact us
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
