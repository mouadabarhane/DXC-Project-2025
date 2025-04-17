import HeaderSection from "@/app/components/headerSection";

const description =
  "Digital landscape, ensuring the security and trustworthiness of online communications is paramount for businesses. Our SSL certification service provides the necessary encryption and authentication protocols to protect sensitive data and establish a secure connection between users and websites.";

const Section = () => {
  return (
    <div>
      <HeaderSection title="SSL Certification" description={description} />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-12 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                SSL certificates provide the fastest, easiest, and most
                cost-effective solution for online businesses to create a secure
                website environment. Issued within minutes, Sectigo DV
                certificates provide industry-standard 256-bit encryption and
                validate domain ownership, giving your customers peace-of-mind
                knowing they are visiting a safe and secure site
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Section;
