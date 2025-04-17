import React, { useState } from "react";
import ProductOfferingCharacteristics from "./ProductOfferingCharacteristics";

type PropsType = {
  productOrders: Array<any>;
  locations: Array<any>;
  onAdd: (item: any) => void;
  onCancel: () => void;
};

export default function AddOrderItemModal({
  productOrders,
  locations,
  onAdd,
  onCancel,
}: PropsType) {
  const [selectedItem, setSelectedItem] = useState<any>();

  const handleOnAdd = () => {
    onAdd(selectedItem);
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
          <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Add order line item
                  </h3>
                  <h5>
                    Choose the order line items you would like to add for this
                    order
                  </h5>
                  <div className="mt-2">
                    {productOrders.map((productOrder) => {
                      const locationFound = locations.find(
                        (location) =>
                          location.value === productOrder.locationId,
                      );

                      return (
                        <ProductOfferingCharacteristics
                          location={locationFound}
                          offerings={productOrder.offerings}
                          selectedItem={selectedItem}
                          setSelectedItem={setSelectedItem}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-[#5f249f] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249ff0] sm:ml-3 sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                onClick={handleOnAdd}
                disabled={!selectedItem}
              >
                Add
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-mdv  px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto bg-white"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
