import axios from "axios";
import * as dotenv from "dotenv";

import {
  TCategory,
  TChannel,
  TProductOfferingPrice,
  TSelectedProductSpec,
} from "../types";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const createProductOffering = async (
  e: any,
  {
    productName,
    productDescription,
    chosenProductSpecification,
    category,
    channel,
    validFor: { startDate, endDate },
    selectedProductSpec,
    productOfferingPrice,
  }: {
    productName: string;
    productDescription: string;
    chosenProductSpecification: string;
    category: TCategory | null;
    channel: TChannel[] | null;
    validFor: {
      startDate: string;
      endDate: string;
    };
    selectedProductSpec: TSelectedProductSpec | null;
    productOfferingPrice: TProductOfferingPrice;
  },
  {
    setProductName,
    setProductDescription,
    setChosenProductSpecification,
    setCategory,
    setChannel,
    setStartDate,
    setEndDate,
    setSelectedProductSpec,
    setSelectedCharacteristic,
    setSelectedCharacteristicValue,
    setProductOfferingPrice,
  }: {
    setProductName: (value: React.SetStateAction<string>) => void;
    setProductDescription: (value: React.SetStateAction<string>) => void;
    setChosenProductSpecification: (
      value: React.SetStateAction<string>,
    ) => void;
    setCategory: (value: React.SetStateAction<TCategory | null>) => void;
    setChannel: (value: React.SetStateAction<TChannel[] | null>) => void;
    setStartDate: (value: React.SetStateAction<string>) => void;
    setEndDate: (value: React.SetStateAction<string>) => void;
    setSelectedProductSpec: (
      value: React.SetStateAction<TSelectedProductSpec | null>,
    ) => void;
    setSelectedCharacteristic: (value: React.SetStateAction<string>) => void;
    setSelectedCharacteristicValue: (
      value: React.SetStateAction<string>,
    ) => void;
    setProductOfferingPrice: (
      value: React.SetStateAction<TProductOfferingPrice>,
    ) => void;
  },
) => {
  e.preventDefault();

  try {
    console.log("productName:", productName);
    console.log("productDescription:", productDescription);
    //console.log("productPrice:", productPrice);
    console.log("choosenproductSpecifications:", chosenProductSpecification);
    console.log("category:", category);
    console.log("channel:", channel);

    const url = `${AXIOS_URL}/api/product-offering`;

    // Fetch the selected product specification details
    const specificationUrl = `${AXIOS_URL}/api/product-offering/${chosenProductSpecification}`;
    const specificationResponse = await axios.get(specificationUrl);
    const specificationData = await specificationResponse.data;

    const productData = {
      name: productName,
      description: productDescription,
      //price: productPrice,
      productspecification: {
        //id: choosenproductSpecifications,
        id: specificationData.id,
        name: specificationData.name,
        version: specificationData.version,
        internalVersion: specificationData.internalVersion,
        internalId: specificationData.internalId,
      },
      category: {
        id: specificationData.category.id,
        name: specificationData.category.name,
      },
      channel: channel
        ? channel.map((ch) => ({ id: ch.id, name: ch.name }))
        : [], // Handle null case
      validFor: {
        startDateTime: startDate,
        endDateTime: endDate,
      },
      productSpecCharacteristic:
        selectedProductSpec?.productSpecCharacteristic.map(
          (characteristic: any) => ({
            name: characteristic.name,
            valueType: characteristic.valueType,
            productSpecCharacteristicValue:
              characteristic.productSpecCharacteristicValue.map(
                (value: any) => ({
                  value: value.value,
                }),
              ),
          }),
        ),

      productOfferingPrice: [
        {
          price: {
            taxIncludedAmount: {
              unit: productOfferingPrice.price.taxIncludedAmount.unit,
              value: productOfferingPrice.price.taxIncludedAmount.value,
            },
          },
          priceType: productOfferingPrice.priceType,
        },
      ],
    };

    console.log(productData);

    await axios.post(url, productData);
    alert("Product created successfully");
    setProductName("");
    setProductDescription("");
    //setProductPrice(0);
    setChosenProductSpecification("");
    setCategory(null);
    setChannel(null);
    setStartDate("");
    setEndDate("");
    setSelectedProductSpec(null);
    setSelectedCharacteristic("");
    setSelectedCharacteristicValue("");
    setProductOfferingPrice({
      price: { taxIncludedAmount: { unit: "", value: "" } },
      priceType: "",
    });
  } catch (err) {
    console.error(err);
  }
};

export default createProductOffering;
