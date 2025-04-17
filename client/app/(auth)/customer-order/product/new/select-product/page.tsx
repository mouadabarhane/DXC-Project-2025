"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";

import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";
import {
  NewCustomerOrderContext,
  ProductOfferingType,
  ProductOrderType,
  OptionType,
} from "../context/new-customer-order-context";
import LocationModal from "../components/LocationModal";
import {
  ProductOfferingServices,
  LocationServices,
  ProductOrderServices,
} from "../services";
import ProductOfferingItem from "./ProductOfferingItem";
import generateCreateOrderRequestBody from "../utils/generateCreateOrderRequestBody";
import readCreateOrderResponse from "../utils/readCreateOrderResponse";
import LoadingScreen from "../components/LoadingScreen";

export default function SelectProduct() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [showNewLocationModal, setShowNewLocationModal] = useState(false);

  const [currentProductOrder, setCurrentProductOrder] =
    useState<ProductOrderType>();

  const [productOfferings, setProductOfferings] = useState(
    [] as Array<ProductOfferingType>,
  );

  const [accountLocations, setAccountLocations] = useState(
    [] as Array<OptionType>,
  );

  const [isLoadingCreateOrder, setIsloadingCreateOrder] = useState(false);
  const [isLoadingSelectProductOffering, setIsloadingSelectProductOffering] =
    useState(false);

  useEffect(() => {
    if (myContext.locations.length === 0) {
      setShowNewLocationModal(true);
    }
  }, []);

  useEffect(() => {
    const getLocationsByAccountId = async () => {
      const response = await LocationServices.getLocationsByAccountId(
        myContext.account.value,
      );
      console.log("getLocationsByAccountId response", response);

      const locationsIds = response.data.result.map(
        (accountAddressRelationship: any) =>
          accountAddressRelationship.location.value,
      );
      console.log("getLocationsByAccountId locationsIds", locationsIds);

      // oussama:to get locations of specific account otherwise the order will not be created in servicenow
      const response2 = await LocationServices.getLocationsWidthIds(
        locationsIds,
      );

      console.log("getLocationsByAccountId response2", response2);

      const requiredData = response2.data.result.map((location: any) => {
        return {
          value: location.sys_id,
          label: location.name,
        };
      });

      console.log("requiredData", requiredData);

      setAccountLocations(requiredData);
    };

    /* oussama : in the service below i now only get product offerings that has a product specification 
                to avoid errors in servicenow 
     *           because in the demo data they published the offerings without a product specification 
    */
    const getAllProductOfferings = async () => {
      const response = await ProductOfferingServices.getAllProductOfferings();

      console.log("getAllProductOfferings response", response);

      const requiredData = response.data
        .filter(
          (productOffering: any) =>
            productOffering.productSpecification !== null &&
            Object.keys(productOffering.productSpecification).length > 0,
        )
        .map((productOffering: any) => {
          return {
            value: productOffering.id,
            label: productOffering.name,
            productOfferingObject: productOffering,
          };
        });
      console.log("requiredData", requiredData);
      setProductOfferings(requiredData);
    };
    getLocationsByAccountId();
    getAllProductOfferings();
  }, []);

  useEffect(() => {
    setCurrentProductOrder(myContext.getSelectedProductOrder());
  }, [myContext.productOrders, myContext.selectedLocationId]);

  useEffect(() => {
    console.log("currentProductOrder has changed", currentProductOrder);
  }, [currentProductOrder]);

  const handleConfigureOnClick = async () => {
    setIsloadingCreateOrder(true);
    // prepare all data (request body)
    const requestBody = generateCreateOrderRequestBody(myContext);
    console.log("handleConfigureOnClick requestBody", requestBody);

    try {
      // call instance to create order
      const result = await ProductOrderServices.createOrder(requestBody)
        .then((response) => {
          console.log(response);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (result.productOrder) {
        // read response
        const updatedData = readCreateOrderResponse(result.productOrder);

        // store updated data
        myContext.updateProductOrdersOnCreateOrder(updatedData);

        // redirect to step 3
        route.push("/customer-order/product/new/configure-product");
      }
    } catch (e) {
      console.log("Error occured trying to create the order...", e);
    }

    setIsloadingCreateOrder(false);
  };

  const handleQuantityOnChange = (value: string) => {
    let tamp = value;
    if (value === "") {
      tamp = "1";
    }
    // myContext.setQuantity(parseInt(tamp));
  };

  const handleLocationOnAdd = (newLocations: Array<OptionType>) => {
    console.log("location", newLocations);
    const tamp = myContext.locations.concat(newLocations);
    myContext.setLocations(tamp);
    myContext.setSelectedLocationId(newLocations[0].value);
    setShowNewLocationModal(false);
  };

  const handleLocationOnCancel = () => {
    setShowNewLocationModal(false);
  };

  const handleAddLocationOnClick = () => {
    setShowNewLocationModal(true);
  };

  const handleDeleteLocationOnClick = () => {
    myContext.deleteSelectedLocation();
  };

  const handleProductOfferingOnChange = async (
    option: ProductOfferingType,
    index: number,
    isQuantityUpdate: boolean,
  ) => {
    setIsloadingSelectProductOffering(true);
    console.log("handleProductOfferingOnChange onChange", option);
    const currentOfferings = currentProductOrder?.offerings || [];

    if (!isQuantityUpdate) {
      // get all characteristics ids by offering
      // then get their details (including is_mandatory)
      // store in context
      const offeringId = option.productOfferingObject.id;

      const response =
        await ProductOfferingServices.getCharacteristicsByOfferingId(
          offeringId,
        );

      console.log(
        "getCharacteristicsByOfferingId mandatory",
        response.data.result,
      );
      const characteristicsIds = response.data.result.map(
        (item: any) => item.characteristic.value,
      );

      console.log(
        "getCharacteristicsByOfferingId characteristicsIds",
        characteristicsIds,
      );

      const mandatoryCharacteristicsIds = response.data.result
        .filter((item: any) => item.is_mandatory === "true")
        .map((item: any) => item.characteristic.value);

      console.log(
        "getCharacteristicsByOfferingId mandatoryCharacteristicsIds",
        mandatoryCharacteristicsIds,
      );

      // get mandatory characteristics by characteristics ids
      const response2 = await ProductOfferingServices.getCharacteristicsByIds(
        characteristicsIds,
      );
      console.log("getCharacteristicsByOfferingId response2", response2);

      const optionsCharacteristics = response2.data.result.map((item: any) => {
        const isMandatory = mandatoryCharacteristicsIds.find(
          (item2: any) => item2 === item.sys_id,
        );
        return {
          id: item.sys_id,
          name: item.name,
          isMandatory: !!isMandatory,
        };
      });

      console.log(
        "getCharacteristicsByOfferingId optionsCharacteristics",
        optionsCharacteristics,
      );

      option.optionsCharacteristics = optionsCharacteristics;
      option.selectedCharacteristicsIds = [];
    }
    myContext.updateSelectedProductOrder(
      "offerings",
      currentOfferings.map((offering, i) => (i === index ? option : offering)),
    );
    setIsloadingSelectProductOffering(false);
  };

  const handleAddProductOfferingOnClick = () => {
    const currentOfferings = currentProductOrder?.offerings || [];
    myContext.updateSelectedProductOrder("offerings", [
      ...currentOfferings,
      { quantity: 1 },
    ]);
  };

  const handleLocationLabelOnClick = (locationId: string) => {
    console.log("handleLocationLabelOnClick", locationId);
    myContext.setSelectedLocationId(locationId);
  };

  const handleProductOfferingOnDelete = (index: number) => {
    myContext.deleteProductOffering(index);
  };

  // console.log("OFFERING - ", myContext.selectedOfferings);
  return (
    <SubLayout
      leftChildren={
        <div className="flex flex-col">
          {isLoadingCreateOrder && <LoadingScreen title="Creating order" />}
          {isLoadingSelectProductOffering && (
            <LoadingScreen title="Selecting product offering, and fetching characteristics mandatory information" />
          )}
          {showNewLocationModal && (
            <LocationModal
              options={accountLocations.filter(
                // filter to only not selected locations
                (location) =>
                  !myContext.locations.find(
                    (location2) => location.value === location2.value,
                  ),
              )}
              onAdd={handleLocationOnAdd}
              onCancel={handleLocationOnCancel}
              cancelDisabled={myContext.locations.length === 0}
            />
          )}
          <div className="flex gap-4 justify-between items-center p-4">
            <h4 className="font-extrabold">Locations</h4>
            <span className="flex gap-4 justify-between items-center">
              <BsFillTrash3Fill
                className="cursor-pointer"
                onClick={handleDeleteLocationOnClick}
              />
              <BsPlusLg
                className="cursor-pointer"
                onClick={handleAddLocationOnClick}
              />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {myContext.locations.map((location) => (
              <div
                className={`text-sm p-1 ${
                  myContext.selectedLocationId === location.value
                    ? "border-l-2 border-l-[#2c755e] bg-[#daeae7]"
                    : ""
                }`}
                onClick={() => handleLocationLabelOnClick(location.value)}
              >
                {location.label}
              </div>
            ))}
          </div>
        </div>
      }
      rightChildren={
        <>
          <div>
            <h4 className="font-extrabold">Select Product</h4>
            <h6>For each location, choose a contact, product, and quantity.</h6>
          </div>
          <div>
            <h4 className="font-extrabold">Location Contact</h4>
            <div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="firt name"
                  title="Firt Name"
                  required={true}
                  placeholder="Firt Name"
                  value={currentProductOrder?.firstname}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("firstname", value);
                  }}
                />
                <InputText
                  slug="last name"
                  title="Last Name"
                  required={true}
                  placeholder="Last Name"
                  value={currentProductOrder?.lastname}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("lastname", value);
                  }}
                />
              </div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="email"
                  title="Email"
                  required={true}
                  placeholder="Email"
                  value={currentProductOrder?.email}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("email", value);
                  }}
                />
                <InputText
                  slug="mobile number"
                  title="Mobile Number"
                  required={true}
                  placeholder="Mobile Number"
                  value={currentProductOrder?.mobilenumber}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("mobilenumber", value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-extrabold">Product Offerings</h4>
            {currentProductOrder?.offerings.map((productOffering, index) => (
              <ProductOfferingItem
                options={productOfferings}
                selected={productOffering}
                onChange={(option, isQuantityUpdate = false) =>
                  handleProductOfferingOnChange(option, index, isQuantityUpdate)
                }
                onDelete={() => handleProductOfferingOnDelete(index)}
              />
            ))}
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleAddProductOfferingOnClick}
            >
              Add Product Offerings
            </button>
          </div>
        </>
      }
      bottomChildren={
        <div>
          <button
            onClick={handleConfigureOnClick}
            className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
          >
            Configure
          </button>
        </div>
      }
    />
  );
}
