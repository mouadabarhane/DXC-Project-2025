import { MdCancel } from "react-icons/md";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoIosArchive, IoMdRemoveCircle } from "react-icons/io";
import ProductOfferingCharacteristics from "./characteristics";

export default function ProductOfferingInfos({
  productOffering,
}: {
  productOffering: {
    status: string;
    name: string;
    description: string;
    productOfferingPrice: { price: { taxIncludedAmount: { unit: string } } }[];
    prodSpecCharValueUse: {
      name: string;
      description: string;
      productSpecCharacteristicValue: { value: string }[];
    }[];
  };
}) {
  return (
    <div className="my-5 p-5">
      <h1 className="text-4xl font-bold flex items-center">
        {productOffering?.status === "published" ? (
          <BsFillPatchCheckFill className="me-3 text-green-500" />
        ) : productOffering?.status === "draft" ? (
          <IoMdRemoveCircle className="me-3 text-orange-400" />
        ) : productOffering?.status === "archived" ? (
          <IoIosArchive className="me-3 text-purple-400" />
        ) : productOffering?.status === "retired" ? (
          <MdCancel className="me-3 text-red-500" />
        ) : null}
        {productOffering?.name}
      </h1>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg  py-2 font-semibold leading-7 text-gray-500">
          {productOffering?.description}
          <div className="font-medium text-1xl flex items-center">
            <span className="me-2">Price options: </span>
            <div className="flex gap-3">
              {productOffering.productOfferingPrice.map(
                (offeringPrice: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex bg-blue-100 py-0.25 px-2 rounded"
                    >
                      <div className="text-green-600">
                        {offeringPrice.price.taxIncludedAmount.unit === "USD"
                          ? "$"
                          : "£"}
                        <span className="ms-1">
                          {offeringPrice.price.taxIncludedAmount.value}
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </h3>
        <h2 className="mt-5 max-w-2xl text-2xl leading-6 text-blue-900 font-medium">
          Characteristics
        </h2>
      </div>
      <ProductOfferingCharacteristics
        prodSpecCharValueUse={productOffering.prodSpecCharValueUse}
      />
    </div>
  );
}
