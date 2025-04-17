"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
// import axios, { AxiosResponse } from "axios";
import axios from "axios";
import * as dotenv from "dotenv";
import Link from "next/link";
import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/header/Header";

import "../Form.css";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export default function NewProductOfferingPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [channel, setChannel] = useState<{ id: string; name: string }[] | null>(
    null,
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [productSpecifications, setProductSpecifications] = useState<
    {
      _id: string;
      name: string;
      id: string;
      version: string;
      internalVersion: string;
      internalId: string;
    }[]
  >([]);
  const [chosenProductSpecification, setChosenProductSpecification] =
    useState("");
  const [selectedProductSpec, setSelectedProductSpec] = useState<{
    id: string;
    name: string;
    productSpecCharacteristic: Array<{
      name: string;
      valueType: string;
      productSpecCharacteristicValue: Array<{ value: string }>;
    }>;
  } | null>(null);

  const [productOfferingPrice, setProductOfferingPrice] = useState<{
    price: {
      taxIncludedAmount: {
        unit: string;
        value: string;
      };
    };
    priceType: string;
  }>({ price: { taxIncludedAmount: { unit: "", value: "" } }, priceType: "" });

  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    string[]
  >([]);
  const [selectedCharacteristicValues, setSelectedCharacteristicValues] =
    useState<Array<Array<string>>>([]);
  const [characteristics, setCharacteristics] = useState<string[]>([]);

  useEffect(() => {
    fetchProductSpecifications();
  }, []);

  const fetchProductSpecifications = async () => {
    try {
      const url = `${AXIOS_URL}/api/product-specification`;
      const response = await axios.get(url);
      const data = response.data;
      setProductSpecifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpecificationDetails = async () => {
    try {
      const specificationUrl = `${AXIOS_URL}/api/product-specification/id/${chosenProductSpecification}`;
      const specificationResponse = await axios.get(specificationUrl);
      const specificationData = specificationResponse.data;
      setSelectedProductSpec(specificationData);
      setCategory({
        id: specificationData.category.id,
        name: specificationData.category.name,
      });
      setChannel(specificationData.channel || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCharacteristicChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const value = event.target.value;
    const updatedCharacteristics = [...selectedCharacteristics];
    updatedCharacteristics[index] = value;
    setSelectedCharacteristics(updatedCharacteristics);
  };

  const handleCharacteristicValueChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );
    const updatedCharacteristicValues = [...selectedCharacteristicValues];
    updatedCharacteristicValues[index] = selectedValues;
    setSelectedCharacteristicValues(updatedCharacteristicValues);
  };

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, ""]);
    setSelectedCharacteristics([...selectedCharacteristics, ""]);
    setSelectedCharacteristicValues([...selectedCharacteristicValues, []]);
  };

  const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("productName:", productName);
      console.log("productDescription:", productDescription);
      console.log("chosenProductSpecification:", chosenProductSpecification);
      console.log("category:", category);
      console.log("channel:", channel);

      const url = `${AXIOS_URL}/api/product-offering`;

      const specificationUrl = `${AXIOS_URL}/api/product-specification/id/${chosenProductSpecification}`;
      const specificationResponse = await axios.get(specificationUrl);
      const specificationData = specificationResponse.data;

      const productData = {
        name: productName,
        description: productDescription,
        productSpecification: {
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
          : [],

        validFor: {
          startDateTime: startDate,
          endDateTime: endDate,
        },

        productSpecCharacteristic: selectedCharacteristics.map(
          (characteristic, index) => {
            const selectedCharacteristicData =
              selectedProductSpec?.productSpecCharacteristic.find(
                (char) => char.name === characteristic,
              );
            const selectedValues = selectedCharacteristicValues[index].map(
              (value) => ({
                value: value,
              }),
            );
            return {
              name: selectedCharacteristicData?.name || "",
              valueType: selectedCharacteristicData?.valueType || "",
              productSpecCharacteristicValue: selectedValues,
            };
          },
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
      setChosenProductSpecification("");
      setCategory(null);
      setChannel(null);
      setStartDate("");
      setEndDate("");
      setSelectedProductSpec(null);
      setSelectedCharacteristics([]);
      setSelectedCharacteristicValues([]);
      setCharacteristics([]);
      setProductOfferingPrice({
        price: { taxIncludedAmount: { unit: "", value: "" } },
        priceType: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6">
        <Header />
        <div className="flex w-full">
          <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
            <div className="Details">
              <nav className="navbar">
                <h3>ProductOffering</h3>
              </nav>
              <form onSubmit={createProduct}>
                <div className="Infos">
                  {/* Add any other properties of the order object here */}
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Name:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="name"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Productspecifecation:
                      </label>

                      <select
                        className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                        id="productSpecification"
                        value={chosenProductSpecification}
                        onChange={(e) => {
                          setChosenProductSpecification(e.target.value);
                          setCategory(null); // Updated
                          setChannel(null); // Updated
                        }}
                        onBlur={fetchSpecificationDetails}
                      >
                        <option value="">Select a product specification</option>
                        {productSpecifications.map((spec) => (
                          <option key={spec._id} value={spec._id}>
                            {spec.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Channel:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="channel"
                        type="text"
                        value={
                          channel
                            ? channel.map((item) => item.name).join(", ")
                            : []
                        }
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Category:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={category?.name || ""}
                        readOnly
                      />
                    </div>

                    {selectedCharacteristics.map((characteristic, index) => (
                      <div
                        key={index}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                      >
                        <label
                          htmlFor={`characteristic-${index}`}
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          Product Spec Characteristic {index + 1}:
                        </label>
                        <select
                          className="block w-full bg-gray-200 text-gray-700 border border-Gray-500 py-3 px-4 mb-3 leading-tight focus:outline-none rounded-md"
                          id={`characteristic-${index}`}
                          value={characteristic}
                          onChange={(e) => handleCharacteristicChange(e, index)}
                        >
                          <option value="">Select Characteristic</option>
                          {selectedProductSpec?.productSpecCharacteristic &&
                            selectedProductSpec.productSpecCharacteristic.map(
                              (char) => (
                                <option key={char.name} value={char.name}>
                                  {char.name}
                                </option>
                              ),
                            )}
                        </select>

                        {index === selectedCharacteristics.length - 1 && (
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                              Characteristic Value:
                            </label>
                            <select
                              className="block w-full bg-gray-200 text-gray-700 border border-Gray-500 py-3 px-4 mb-3 leading-tight focus:outline-none rounded-md"
                              multiple
                              value={selectedCharacteristicValues.flat()}
                              onChange={(e) =>
                                handleCharacteristicValueChange(
                                  e,
                                  selectedCharacteristics.length - 1,
                                )
                              }
                            >
                              {selectedCharacteristics.length > 0 &&
                                selectedProductSpec?.productSpecCharacteristic &&
                                selectedProductSpec.productSpecCharacteristic
                                  .find(
                                    (char) =>
                                      char.name ===
                                      selectedCharacteristics[
                                        selectedCharacteristics.length - 1
                                      ],
                                  )
                                  ?.productSpecCharacteristicValue.map(
                                    (value) => (
                                      <option
                                        key={value.value}
                                        value={value.value}
                                      >
                                        {value.value}
                                      </option>
                                    ),
                                  )}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <button
                        className="buttonadd"
                        type="button"
                        onClick={addCharacteristic}
                      >
                        Add Characteristic
                      </button>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Start Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        End Date:
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Price Unit::
                      </label>

                      <input
                        className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                        id="unit"
                        type="text"
                        value={
                          productOfferingPrice.price.taxIncludedAmount.unit
                        }
                        onChange={(e) =>
                          setProductOfferingPrice((prev) => ({
                            ...prev,
                            price: {
                              ...prev.price,
                              taxIncludedAmount: {
                                ...prev.price.taxIncludedAmount,
                                unit: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Price Value:
                      </label>
                      <input
                        className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                        id="value"
                        type="text"
                        value={
                          productOfferingPrice.price.taxIncludedAmount.value
                        }
                        onChange={(e) =>
                          setProductOfferingPrice((prev) => ({
                            ...prev,
                            price: {
                              ...prev.price,
                              taxIncludedAmount: {
                                ...prev.price.taxIncludedAmount,
                                value: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Price Type
                      </label>

                      <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="priceType"
                        value={productOfferingPrice.priceType}
                        onChange={(e) =>
                          setProductOfferingPrice((prev) => ({
                            ...prev,
                            priceType: e.target.value,
                          }))
                        }
                      >
                        <option value="nonRecurring">Non-Recurring</option>
                        <option value="recurring">Recurring</option>
                      </select>
                    </div>
                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Short description:
                      </label>
                      <textarea
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <Link href="#">
                        <button className="text-sm font-semibold leading-6 text-gray-900">
                          Cancel
                        </button>
                      </Link>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
