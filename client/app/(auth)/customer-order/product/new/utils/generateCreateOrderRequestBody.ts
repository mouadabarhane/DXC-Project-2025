import { NewCustomerOrderContextType } from "../context/new-customer-order-context";

const { v4: uuidv4 } = require("uuid");

const generateOneProductOrderItem = (
  offering: any,
  isChange: boolean = false,
) => {
  const allCharacteristics =
    offering.productOfferingObject.prodSpecCharValueUse;
  const mandatoryCharacteristics = offering.optionsCharacteristics.filter(
    (item: any) => item.isMandatory,
  );
  const productCharacteristic = allCharacteristics.filter((item: any) =>
    mandatoryCharacteristics.find((item2: any) => item2.name === item.name),
  );

  if (isChange) {
    productCharacteristic.push(
      ...allCharacteristics
        .filter((item: any) =>
          offering.optionsCharacteristics.find(
            (item2: any) =>
              item2.name === item.name &&
              offering.selectedCharacteristicsIds?.includes(item2.id),
          ),
        )
        .map((item: any) => ({
          ...item,
          value:
            offering.optionsCharacteristics.find(
              (item2: any) => item2.name === item.name,
            )?.value || "",
        })),
    );
  }
  return {
    id: uuidv4(),
    action: isChange ? "change" : "add",
    itemPrice: offering.productOfferingObject.productOfferingPrice,
    product: {
      place: {
        id: offering.locationId,
        "@type": "Place",
      },
      productCharacteristic,
      productSpecification: {
        ...offering.productOfferingObject.productSpecification,
        "@type": "ProductSpecificationRef",
      },
      relatedParty: [
        {
          id: offering.id,
          firstName: offering.firstname,
          lastName: offering.lastname,
          email: offering.email,
          phone: offering.mobilenumber,
          "@referredType": "RelatedParty",
          "@type": "OrderLineItemContact",
        },
      ],
      "@type": "Product",
    },
    productOffering: {
      id: offering.value,
      name: offering.label,
    },
    productOrderItemRelationship: [],
    quantity: offering.quantity,
    "@type": "ProductOrderItem",
  };
};

const generateCreateOrderRequestBody = (
  myContext: NewCustomerOrderContextType,
  isChange?: boolean,
) => {
  const allProductOfferings = myContext.productOrders.flatMap((productOrder) =>
    productOrder.offerings.map((offering) => ({
      ...offering,
      locationId: productOrder.locationId,
      id: myContext.contact.value,
      firstname: productOrder.firstname,
      lastname: productOrder.lastname,
      email: productOrder.email,
      mobilenumber: productOrder.mobilenumber,
    })),
  );

  const channelsWithDuplicatedChannels = allProductOfferings.flatMap(
    (productOffering) => productOffering.productOfferingObject.channel,
  );

  const uniqueChannels = channelsWithDuplicatedChannels.filter(
    (oneChannel, index, array) =>
      array.findIndex((oneChannel2) => oneChannel2.id === oneChannel.id) ===
      index,
  );

  return {
    orderCurrency: "USD",
    channel: uniqueChannels,
    externalId: "",
    productOrderItem: allProductOfferings.map((item: any) =>
      generateOneProductOrderItem(item, isChange),
    ),
    relatedParty: [
      {
        id: myContext.account.value,
        name: myContext.account.label,
        "@type": "RelatedParty",
        "@referredType": "Customer",
      },
      {
        id: myContext.contact.value,
        name: myContext.contact.label,
        "@type": "RelatedParty",
        "@referredType": "CustomerContact",
      },
    ],
    "@type": "ProductOrder",
  };
};

export default generateCreateOrderRequestBody;
