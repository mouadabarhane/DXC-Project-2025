import React from "react";
import Image from "next/image";
import dev2 from "./dev2.jpg";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl: require("./dev1.jpg").default,
  },
  {
    name: "james dono",
    role: "Engineer / FRONTENd",
    imageUrl: require("./dev2.jpg").default,
  },
  {
    name: "jean robert",
    role: "Engineer / FullStuck",
    imageUrl: require("./dev3.jpg").default,
  },
  {
    name: "Mariah claire",
    role: "Engineer / BACKEND",
    imageUrl: require("./dev4.jpg").default,
  },
  {
    name: "Lisa Olivera",
    role: "Engineer /DATA SCIENCEs",
    imageUrl: require("./dev5.jpg").default,
  },
  {
    name: "Leslie Alexander",
    role: "Engineer / FRONTENd",
    imageUrl: require("./dev6.jpg").default,
  },
  // More people...
];
const stats = [
  { id: 1, name: "Countries", value: "70+" },
  { id: 2, name: "Employees", value: "130,000+" },
  { id: 3, name: "Customers in the Fortune 500", value: "240+" },
];
const Team = () => {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight purple-header-links sm:text-4xl">
              {" "}
              The Leading Developer Marketing Agency
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ur team helps the world’s largest technology companies build,
              grow, and manage developer marketing programs. With a foundational
              understanding of technical concepts, Catchy creates and executes
              on strategies that drive value.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Image
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt={person.name}
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
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

export default Team;
