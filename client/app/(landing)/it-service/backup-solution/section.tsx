import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { id: 1, name: "Countries", value: "70+" },
  { id: 2, name: "Employees", value: "130,000+" },
  { id: 3, name: "Customers in the Fortune 500", value: "240+" },
];

const features = [
  {
    name: "Data Protection and Reliability:",
    description:
      "Our backup solution utilizes robust technologies to protect your data against accidental deletion, hardware failure, natural disasters, and malicious attacks. With regular automated backups, your critical business data is securely stored in an offsite location, minimizing the risk of data loss.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Flexible Backup Options: ",
    description:
      "We offer a range of backup options tailored to your specific needs. Whether you require full system backups, incremental backups, or selective file backups, our solution allows for customization based on your data volume, frequency of changes, and recovery time objectives.",
    icon: LockClosedIcon,
  },
  {
    name: "Rapid Data Recovery: ",
    description:
      "In the event of data loss or system failure, our backup solution enables quick and efficient data recovery. You can restore individual files, entire folders, or complete system backups, depending on your recovery requirements. Minimize downtime and get your business back up and running swiftly..",
    icon: ArrowPathIcon,
  },
  {
    name: "Scalability and Growth:",
    description:
      "Our backup solution is designed to scale with your business. As your data grows, our solution adapts to accommodate increasing storage requirements. Whether you operate a small business or an enterprise-level organization, we have the capacity to handle your backup needs effectively.",
    icon: FingerPrintIcon,
  },
  {
    name: "Data Security and Compliance:",
    description:
      "  We prioritize the security and confidentiality of your data. Our backup solution incorporates robust encryption mechanisms to safeguard your sensitive information during transit and storage. Compliance with industry regulations such as GDPR, HIPAA, or PCI-DSS is ensured to meet your specific data protection and privacy requirements.",
    icon: FingerPrintIcon,
  },
  {
    name: "Easy Management and Monitoring:",
    description:
      "Our backup solution offers a user-friendly interface that allows for easy management and monitoring of your backup processes. You can schedule automated backups, monitor backup status, and receive notifications to ensure that your data is consistently protected without requiring manual intervention.",
    icon: FingerPrintIcon,
  },
];

const Section = () => {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Bach Up Solution
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Leading to operational disruptions, financial loss, and damaged
              reputation.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our backup solution provides a reliable and comprehensive method
              to protect and recover critical data, ensuring business continuity
              and peace of mind.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto  max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight purple-header-links sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Section;
