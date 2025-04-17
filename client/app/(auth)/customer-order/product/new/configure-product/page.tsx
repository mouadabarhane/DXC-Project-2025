"use client";

import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";
import {
  NewCustomerOrderContext,
  OptionType,
} from "../context/new-customer-order-context";
import ProductOfferingItem from "./ProductOfferingItem";
import AddOrderItemModal from "./AddOrderItemModal";
import Details from "./Details";
import Characteristics from "./Characteristics";
import generateCreateOrderRequestBody from "../utils/generateCreateOrderRequestBody";
import LoadingScreen from "../components/LoadingScreen";
import { ProductOrderServices } from "../services";

const DETAILS = "DETAILS";
const CHARACTERISTICS = "CHARACTERISTICS";

export default function ConfigureProduct() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [selected, setSelected] = useState<any>();

  const [showAddOrderItemModal, setShowAddOrderItemModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState(DETAILS);

  const [isLoadingUpdateOrder, setIsloadingUpdateOrder] = useState(false);

  useEffect(() => {
    if (selected?.offering?.generatedId) {
      // when selected does exist, and changes happen in myContext?.productOrders
      const productOrderFound = myContext.getSelectedProductOrder(
        selected.location.value,
      );
      const offeringFound = productOrderFound?.offerings.find(
        (offering) => offering.generatedId === selected.offering.generatedId,
      );
      // update selected.offering with the offeringFound in productOrderFound
      setSelected({ ...selected, offering: offeringFound });
    }
    console.log("updatedeeeee", myContext?.productOrders);
  }, [myContext?.productOrders, selected?.offering?.generatedId]);

  const handleSaveOnClick = async () => {
    setIsloadingUpdateOrder(true);
    function sleep(ms: number) {
      // eslint-disable-next-line no-promise-executor-return
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await sleep(4000);
    // prepare all data (request body)
    // const requestBody = generateCreateOrderRequestBody(myContext, true);
    // console.log(myContext, "handleConfigureOnClick requestBody", requestBody);

    // call instance to create order
    // const result = await ProductOrderServices.updateOrder(
    //   myContext?.orderDetails?.id,
    //   requestBody,
    // );
    // console.log(myContext, "handleConfigureOnClick result", result);

    // read response
    //const updatedData = readCreateOrderResponse(result.data.productOrder);

    // store updated data
    //myContext.updateProductOrdersOnCreateOrder(updatedData);

    route.push("/customer-order/product/new/review-order");
    setIsloadingUpdateOrder(false);
  };

  const handleOfferingItemOnSelect = (
    offering: any,
    location: OptionType,
    characteristicName?: string,
  ) => {
    console.log(
      "handleOfferingItemOnSelect",
      offering,
      location,
      characteristicName,
    );
    setSelected({
      offering,
      location,
      characteristicName,
    });
  };
  const handleQuantityOnChange = (value: string) => {
    let tmp = value;
    if (value === "") {
      tmp = "1";
    }

    myContext.updateSelectedProductOrderOfferingById(
      selected.location.value,
      selected.offering.generatedId,
      { quantity: parseInt(tmp) },
    );
  };

  const handleAddOrderItemOnClick = () => {
    setShowAddOrderItemModal(true);
  };

  const handleAddOrderItemOnAdd = (item: any) => {
    const updatedOffering = item.offering;
    updatedOffering.selectedCharacteristicsIds.push(item.id);
    console.log("data", item, updatedOffering);
    myContext.updateSelectedProductOrderOfferingById(
      item.locationId,
      item.offering.generatedId,
      updatedOffering,
    );
    setShowAddOrderItemModal(false);
  };

  const handleAddOrderItemOnCancel = () => {
    setShowAddOrderItemModal(false);
  };

  const handleDetailsOnClick = () => {
    setSelectedTab(DETAILS);
  };
  const handleCharacteristicsOnClick = () => {
    setSelectedTab(CHARACTERISTICS);
  };

  const handleCharacteristicValueChange = (option: any) => {
    const updatedOffering = selected.offering;
    const updatedOptionsCharacteristics =
      updatedOffering.optionsCharacteristics.map((option2: any) => {
        if (option2.name === option.name) {
          return { ...option2, value: option.value };
        }
        return option2;
      });

    updatedOffering.optionsCharacteristics = updatedOptionsCharacteristics;
    console.log("dlsjldjl hala", updatedOptionsCharacteristics, option);
    myContext.updateSelectedProductOrderOfferingById(
      selected.locationId,
      updatedOffering.generatedId,
      updatedOffering,
    );
  };
  const handleDeleteOrderItemOnClick = () => {};
  return (
    <SubLayout
      leftChildren={
        <div className="flex flex-col">
          {isLoadingUpdateOrder && <LoadingScreen title="Updating order" />}
          <div className="flex gap-4 justify-between items-center p-4">
            <h4 className="font-extrabold">Items</h4>
            <span className="flex gap-4 justify-between items-center">
              <BsFillTrash3Fill
                className="cursor-pointer"
                onClick={handleDeleteOrderItemOnClick}
              />
              <BsPlusLg
                className="cursor-pointer"
                onClick={handleAddOrderItemOnClick}
              />
              {showAddOrderItemModal && (
                <AddOrderItemModal
                  productOrders={myContext?.productOrders}
                  locations={myContext?.locations}
                  onAdd={handleAddOrderItemOnAdd}
                  onCancel={handleAddOrderItemOnCancel}
                />
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2 text-xs whitespace-nowrap">
            {myContext.locations.map((location) => (
              <div>
                <div className="p-1 pb-0 border-b-2">{location.label}</div>
                <div className="flex flex-col">
                  {myContext.productOrders
                    ?.find(
                      (productOrder) =>
                        productOrder.locationId === location.value,
                    )
                    ?.offerings?.map((offering) => (
                      <ProductOfferingItem
                        item={offering}
                        onSelect={(characteristicName?: any) =>
                          handleOfferingItemOnSelect(
                            offering,
                            location,
                            characteristicName,
                          )
                        }
                        selected={selected}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      rightChildren={
        <>
          {!selected && (
            <div className="flex justify-center items-center h-full">
              <h2>Select an order item</h2>
            </div>
          )}
          {selected && (
            <div>
              <div className="flex gap-2 justify-start items-center border-b-2 border-silver">
                <div
                  onClick={handleDetailsOnClick}
                  className={`cursor-pointer ${
                    selectedTab === DETAILS ? "text-[#2c755e] font-black" : ""
                  }`}
                >
                  Details
                </div>
                <div
                  onClick={handleCharacteristicsOnClick}
                  className={`cursor-pointer ${
                    selectedTab === CHARACTERISTICS
                      ? "text-[#2c755e] font-black"
                      : ""
                  }`}
                >
                  Characteristics
                </div>
              </div>
              {selectedTab === DETAILS && (
                <Details
                  selected={selected}
                  handleQuantityOnChange={handleQuantityOnChange}
                />
              )}
              {selectedTab === CHARACTERISTICS && (
                <Characteristics
                  characteristics={selected?.offering?.optionsCharacteristics.filter(
                    (characteristic: any) =>
                      characteristic.isMandatory ||
                      selected?.offering?.selectedCharacteristicsIds?.includes(
                        characteristic.id,
                      ),
                  )}
                  offering={selected?.offering}
                  onCharacteristicValueChange={handleCharacteristicValueChange}
                />
              )}
            </div>
          )}
        </>
      }
      bottomChildren={
        <div>
          <button
            onClick={handleSaveOnClick}
            className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
          >
            Save
          </button>
        </div>
      }
    />
  );
}
