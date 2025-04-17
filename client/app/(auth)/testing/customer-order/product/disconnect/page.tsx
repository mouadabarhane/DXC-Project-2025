"use client";

import axios from "axios";
import * as dotenv from "dotenv";
import { useEffect, useState } from "react";
import useIsMount from "../../../../../hooks/useIsMount";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const payload = {
  orderCurrency: "USD",
  channel: [
    {
      id: "58ad5522c3702010df4773ce3640ddb2",
      name: "Agent assist",
    },
  ],
  productOrderItem: [
    {
      id: "PO100",
      quantity: 5,
      action: "delete",
      product: {
        id: "fa6d13f45b5620102dff5e92dc81c77f",
        isBundle: false,
        "@type": "Product",
        productSpecification: {
          id: "cfe5ef6a53702010cd6dddeeff7b12f6",
          internalId: "cfe5ef6a53702010cd6dddeeff7b12f6",
          name: "SD-WAN Service Package",
          "@type": "ProductSpecificationRef",
        },
        productRelationship: [],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "PO101",
          relationshipType: "HasChild",
        },
        {
          id: "PO102",
          relationshipType: "HasChild",
        },
        {
          id: "PO103",
          relationshipType: "HasChild",
        },
      ],
      "@type": "ProductOrderItem",
    },
    {
      id: "PO101",
      quantity: 1,
      action: "delete",
      itemPrice: [
        {
          description: "Access Fee",
          name: "Access Fee",
          priceType: "nonRecurring",
          price: {
            taxRate: 0,
            dutyFreeAmount: {
              unit: "USD",
              value: 100,
            },
            taxIncludedAmount: {
              unit: "USD",
              value: 220,
            },
          },
        },
      ],
      product: {
        id: "be6d13f45b5620102dff5e92dc81c781",
        isBundle: false,
        "@type": "Product",
        productCharacteristic: [
          {
            name: "Tenancy",
            valueType: "string",
            value: "Premium (>50 sites)",
          },
        ],
        productSpecification: {
          id: "216663aa53702010cd6dddeeff7b12b5",
          name: "SD-WAN Controller",
          "@type": "ProductSpecificationRef",
        },
        place: {
          "@type": "Place",
          id: "5671dd2ec3a53010188473ce3640dd81",
        },
        productRelationship: [],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "PO100",
          relationshipType: "HasParent",
        },
      ],
      "@type": "ProductOrderItem",
    },
    {
      id: "PO102",
      action: "delete",
      quantity: 1,
      itemPrice: [
        {
          description: "Tariff plan monthly fee",
          name: "MonthlyFee",
          priceType: "recurring",
          recurringChargePeriod: "month",
          price: {
            taxRate: 0,
            dutyFreeAmount: {
              unit: "USD",
              value: 300,
            },
            taxIncludedAmount: {
              unit: "USD",
              value: 349,
            },
          },
        },
      ],
      product: {
        id: "766d13f45b5620102dff5e92dc81c78a",
        isBundle: false,
        "@type": "Product",
        productCharacteristic: [
          {
            name: "CPE Model",
            valueType: "string",
            value: "ASR",
          },
          {
            name: "WAN Optimization",
            valueType: "string",
            value: "Advance",
          },
          {
            name: "CPE Type",
            valueType: "string",
            value: "Physical",
          },
          {
            name: "Routing",
            valueType: "string",
            value: "Premium",
          },
        ],
        productSpecification: {
          id: "39b627aa53702010cd6dddeeff7b1202",
          name: "SD-WAN Edge Device",
          "@type": "ProductSpecificationRef",
        },
        place: {
          "@type": "Place",
          id: "5671dd2ec3a53010188473ce3640dd81",
        },
        productRelationship: [],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "PO100",
          relationshipType: "HasParent",
        },
      ],
      "@type": "ProductOrderItem",
    },
    {
      id: "PO103",
      quantity: 1,
      action: "delete",
      itemPrice: [
        {
          description: "Tariff plan monthly security",
          name: "MonthlySecurity",
          priceType: "nonRecurring",
          recurringChargePeriod: "month",
          price: {
            taxRate: 0,
            dutyFreeAmount: {
              unit: "USD",
              value: 30,
            },
            taxIncludedAmount: {
              unit: "USD",
              value: 30,
            },
          },
        },
      ],
      product: {
        id: "326d13f45b5620102dff5e92dc81c785",
        isBundle: false,
        "@type": "Product",
        productCharacteristic: [
          {
            name: "Security Type",
            valueType: "string",
            value: "Premium",
          },
        ],
        productSpecification: {
          id: "a6514bd3534560102f18ddeeff7b1247",
          name: "SD-WAN Security",
          "@type": "ProductSpecificationRef",
        },
        place: {
          "@type": "Place",
          id: "5671dd2ec3a53010188473ce3640dd81",
        },
        productRelationship: [],
      },
      productOffering: {
        id: "69017a0f536520103b6bddeeff7b127d",
        name: "Premium SD-WAN Offering",
      },
      productOrderItemRelationship: [
        {
          id: "PO100",
          relationshipType: "HasParent",
        },
      ],
      "@type": "ProductOrderItem",
    },
  ],
  relatedParty: [
    {
      id: "eaf68911c35420105252716b7d40ddde",
      name: "Sally Thomas",
      "@type": "RelatedParty",
      "@referredType": "CustomerContact",
    },
    {
      id: "ffc68911c35420105252716b7d40dd55",
      name: "Funco Intl",
      "@type": "RelatedParty",
      "@referredType": "Customer",
    },
  ],
  "@type": "ProductOrder",
};

let loggedUser = { userID: "" };

if (typeof window !== "undefined") {
  loggedUser = JSON.parse(localStorage.getItem("user") || '{ userID: "" }');
}

export default function DisconnectProductOrderPage() {
  const isMount = useIsMount();

  const [order, setOrder] = useState(0);
  // const [newOrder, setNewOrder] = useState(false);

  const deleteOrder = (order: number) => {
    setOrder(order + 1);
    // setNewOrder(!newOrder);
  };

  useEffect(() => {
    const handleProductOrderDeletion = async () => {
      let newServiceNowOrder;
      try {
        newServiceNowOrder = await axios.post(
          `${AXIOS_URL}/api/customer-order/product/servicenow`,
          payload,
        );
      } catch (error: any) {
        console.log(error.response.data);
        return { error: error.response.data };
      }
      console.log(newServiceNowOrder);
      const dbPayload = {
        ...newServiceNowOrder.data.productOrder,
        orderNumber: "",
        state: "draft",
        ponr: false,
        soldProducts: [],
      };

      dbPayload.externalId = newServiceNowOrder.data.productOrder.id;
      dbPayload.orderNumber = newServiceNowOrder.data.productOrder.externalId;
      dbPayload.state = newServiceNowOrder.data.productOrder.state;
      dbPayload.createdBy = loggedUser.userID;

      try {
        await axios.post(`${AXIOS_URL}/api/customer-order/product`, dbPayload);
      } catch (error: any) {
        return { error: error.response.data };
      }
    };
    if (!isMount) {
      handleProductOrderDeletion();
    }
  }, [order]);

  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <h1>New Product Order</h1>
        <button
          className="uppercase bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => deleteOrder(order)}
        >
          Delete Order
        </button>
      </div>
    </div>
  );
}
