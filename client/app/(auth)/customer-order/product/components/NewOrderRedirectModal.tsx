import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GiRadioTower } from "react-icons/gi";
import { AiOutlineGlobal } from "react-icons/ai";

const PRODUCT_ORDER = "PRODUCT_ORDER";
const SERVICE_ORDER = "SERVICE_ORDER";

type NewOrderRedirectModaltype = {
  onCancel: () => void;
};

const NewOrderRedirectModal = ({ onCancel }: NewOrderRedirectModaltype) => {
  const route = useRouter();

  const [selected, setSelected] = useState<string>();

  const handleProductOrderOnClick = () => {
    setSelected(PRODUCT_ORDER);
  };
  const handleServiceOrderOnClick = () => {
    setSelected(SERVICE_ORDER);
  };
  const handleOnCreate = () => {
    if (selected === PRODUCT_ORDER) {
      route.push("/customer-order/product/new/create-order");
    }
    if (selected === SERVICE_ORDER) {
      route.push("/customer-order/service");
    }
  };
  const handleOnCancel = () => {
    onCancel();
    console.log("you clicked on cancel");
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Choose an Order type
                  </h3>
                  <div className="mt-2 flex w-full h-40 gap-2">
                    <div
                      onClick={handleProductOrderOnClick}
                      className={`flex flex-col items-center border-2 p-2 w-full justify-center rounded-lg ${
                        selected === PRODUCT_ORDER ? "border-[#5f249ff0]" : ""
                      }`}
                    >
                      <GiRadioTower />
                      Product Order
                    </div>

                    <div
                      onClick={handleServiceOrderOnClick}
                      className={`flex flex-col items-center border-2 p-2 w-full justify-center rounded-lg ${
                        selected === SERVICE_ORDER ? "border-[#5f249ff0]" : ""
                      }`}
                    >
                      <AiOutlineGlobal />
                      Service Order
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-[#5f249f] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249ff0] sm:ml-3 sm:w-auto"
                onClick={handleOnCreate}
              >
                Create
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-mdv bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={handleOnCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewOrderRedirectModal;
