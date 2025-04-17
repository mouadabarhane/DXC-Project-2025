import axios from "axios";
import * as dotenv from "dotenv";
import Link from "next/link";
import { useEffect, useState } from "react";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

type ProductSpecificationType = {
  _id: string;
  name?: string;
  description?: string;
  version?: string;
  validFor?: {
    startDateTime?: string;
    endDateTime?: string;
  };
  lastUpdate?: string;
};

export default function ProductSpecification({
  internalId,
}: {
  internalId: string;
}) {
  const [productSpec, setProductSpec] = useState<ProductSpecificationType>(
    {} as ProductSpecificationType,
  );

  useEffect(() => {
    const getProductSpec = async (id: string) => {
      try {
        const productSpecification = await axios
          .get(`${AXIOS_URL}/api/product-specification/internalId/${id}`)
          .then((res) => res.data)
          .catch((e) => console.log(e));
        if (productSpecification) {
          setProductSpec(productSpecification.productSpecification);
        }
      } catch (exception) {
        console.log(exception);
      }
    };
    getProductSpec(internalId);
  }, []);

  return (
    <div className="product-spec w-3/4 ms-5 mt-5 mb-10">
      <h3 className="text-2xl my-2 font-medium text-blue-900">
        Related Product Specification
      </h3>
      {productSpec && productSpec.hasOwnProperty("_id") ? (
        <table className="w-full table-auto">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-2 border border-purple-700">Name</th>
              <th className="py-2 border border-purple-700">Version</th>
              <th className="py-2 border border-purple-700">Description</th>
              <th className="py-2 border border-purple-700">Start Date</th>
              <th className="py-2 border border-purple-700">End Date</th>
              <th className="py-2 border border-purple-700">Last Update</th>
              <th className="py-2 border border-purple-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 ps-2 border border-purple-400">
                <Link
                  href={`http://localhost:3000/product-specification/${productSpec?._id}`}
                  className="text-blue-700 font-medium"
                >
                  {productSpec?.name}
                </Link>
              </td>
              <td className="py-3 ps-2 border border-purple-400">
                {productSpec?.version}
              </td>
              <td className="py-3 ps-2 border border-purple-400">
                {productSpec?.description}
              </td>
              <td className="py-3 ps-2 border border-purple-400">
                {productSpec?.validFor?.startDateTime}
              </td>
              <td className="py-3 ps-2 border border-purple-400">
                {productSpec?.validFor?.endDateTime}
              </td>
              <td className="py-3 ps-2 border border-purple-400">
                {productSpec?.lastUpdate}
              </td>
              <td className="py-3 ps-2 border border-purple-400">
                <Link
                  href={`http://localhost:3000/product-specification/${productSpec?._id}`}
                  className="bg-gray-400 text-white py-1.5 px-4 shadow-md rounded-lg font-medium hover:bg-gray-500 duration-200"
                >
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="text-1xl font-medium">
          Loading Product Specification Data ...
        </div>
      )}
    </div>
  );
}
