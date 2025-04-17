import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import cloud from "./cloud1.jpg";
import HeaderSection from "../../../components/headerSection";

const statistic = [
  { id: 1, name: "Countries", value: "70+" },
  { id: 2, name: "Employees", value: "130,000+" },
  { id: 3, name: "Customers in the Fortune 500", value: "240+" },
];
const includedFeatures = [
  "Scalability: With our cloud computing service, businesses can easily scale their infrastructure resources up or down based on their changing demands. This flexibility ensures optimal performance during peak periods while minimizing costs during periods of lower demand.",
  "Reliability and Security: We prioritize the security and integrity of our clients data. Our cloud infrastructure is built on state-of-the-art technology, including robust security measures and data encryption protocols. We employ industry best practices to safeguard sensitive information and ensure high availability and disaster recovery capabilities.",
  "Cost Efficiency: Our cloud computing service offers a cost-effective solution compared to traditional on-premises infrastructure. With cloud-based resources, businesses can reduce upfront investment in",
  "hardware, maintenance, and ongoing infrastructure management costs. Our pay-as-you-go model allows organizations to pay only for the resources they consume, optimizing cost efficiency.",
  "Agility and Collaboration: Cloud computing enables teams to collaborate seamlessly, regardless of their physical location. Our service facilitates real-time collaboration, file sharing, and access to shared applications, promoting productivity and enabling remote work capabilities",
  "Innovation and Time-to-Market: By leveraging our cloud computing service, businesses can rapidly develop, test, and deploy applications. The agility of the cloud environment accelerates the time-to-market for new products and services, giving organizations a competitive edge.",
  "Integration and Compatibility: Our cloud computing service seamlessly integrates with existing IT infrastructure, ensuring compatibility with various software applications, databases, and development frameworks. This integration capability enables businesses to leverage their existing investments while harnessing the power of cloud technology.",
  "Expert Support and Managed Services: We provide comprehensive support and managed services for our cloud computing offering. Our team of experienced professionals ensures smooth migration, continuous monitoring, and proactive maintenance, allowing businesses to focus on their core operations while we handle the underlying infrastructure.",
];

const description =
  "Cloud computing has revolutionized the way businesses operate by providing scalable and flexible infrastructure and software solutions.";

const Section = () => {
  return (
    <div>
      <HeaderSection title="Cloud Computing" description={description} />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 ">
            {statistic.map((statistic) => (
              <div
                key={statistic.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-gray-600 ">
                  {statistic.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight purple-header-links sm:text-5xl">
                  {statistic.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                we understand the crucial role cloud computing plays in enabling
                organizations to achieve digital transformation and stay
                competitive in today's fast-paced technological landscape.
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
                src={cloud}
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>

          <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Our cloud computing service offers
                </h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  a comprehensive suite of features and benefits designed to
                  meet the diverse needs of businesses across various
                  industries,Here are some key highlights of our service:
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                    What’s included
                  </h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold purple-header-links">
                      DXC Technology | Morocco
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl tracking-tight text-gray-900">
                        DXC Technology helps global companies run their mission
                        critical systems and operations while modernising IT,
                        optimizing data architectures, and ensuring security and
                        scalability across public, private and hybrid clouds.
                      </span>
                    </p>
                    <a
                      href="#"
                      className="mt-10 block w-full rounded-md bg-indigo-600  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
