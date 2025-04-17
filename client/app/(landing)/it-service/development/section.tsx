import Image from "next/image";
import dxc from "../../../../public/assets/dxc.jpg";
import HeaderSection from "../../../components/headerSection";

const description =
  "Modern Applications Development services enable enterprises to achieve the agility required to improve time to market, reduce costs, attain resiliency and enhance customer experiences";

const Section = () => {
  return (
    <div>
      <HeaderSection title="Development" description={description} />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-3xl sm:leading-9">
              <p>
                DXC Technology recognized by Gartner® as a Leader in the 2023
                Magic Quadrant™ for Outsourced Digital Workplace Services
              </p>
            </blockquote>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Section;
