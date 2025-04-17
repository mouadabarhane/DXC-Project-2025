import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

const Content = () => {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Here are the key features and benefits of our SSL certification
                service:
              </h2>

              <div className="flex flex-col items-start">
                <dt className="mt-4 font-semibold text-white">
                  Data Encryption:
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Our SSL certificates employ robust encryption algorithms to
                  encrypt data transmitted between a user's browser and your
                  website. This encryption ensures that sensitive information
                  such as login credentials, payment details, and personal data
                  remains secure and protected from unauthorized access.
                </dd>
                <dt className="mt-4 font-semibold text-white">
                  Enhanced Customer Experience
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  SSL SSL certificates contribute to a positive user experience
                  by providing a secure browsing environment. When visitors feel
                  safe on your website, they are more likely to engage, make
                  purchases, and share sensitive information. SSL certification
                  demonstrates your dedication to customer security and helps
                  foster long-term customer relationships.
                </dd>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <dt className="mt-4 font-semibold text-white">
                  Compliance and Data Protection
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  SSL certificates play a vital role in meeting regulatory
                  compliance requirements, such as the General Data Protection
                  Regulation (GDPR). By implementing SSL encryption, businesses
                  can demonstrate their commitment to protecting customer data
                  and ensuring privacy compliance.
                </dd>
                <dt className="mt-4 font-semibold text-white">
                  Enhanced Customer Experience
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  SSL SSL certificates contribute to a positive user experience
                  by providing a secure browsing environment. When visitors feel
                  safe on your website, they are more likely to engage, make
                  purchases, and share sensitive information. SSL certification
                  demonstrates your dedication to customer security and helps
                  foster long-term customer relationships.
                </dd>
              </div>

              <div className="flex flex-col items-start">
                <dt className="mt-4 font-semibold text-white">
                  SEO and Search Engine Rankings:{" "}
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  SSL encryption has become a ranking factor for search engines.
                  Websites with SSL certificates tend to receive a boost in
                  search engine rankings compared to non-secure websites. By
                  securing your website with an SSL certificate, you can improve
                  your online visibility and attract more organic traffic.
                </dd>
                <dt className="mt-4 font-semibold text-white">
                  Flexibility and Scalability:
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Our SSL certification service caters to businesses of all
                  sizes and types. Whether you have a small blog, an e-commerce
                  store, or a corporate website, we offer a range of SSL
                  certificate options to meet your specific requirements. Our
                  service scales with your business growth, allowing you to
                  easily add or upgrade certificates as needed.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
