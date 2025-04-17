import { createContext, useState } from "react";

const { v4: uuidv4 } = require("uuid");

export type OptionType = {
  value: string;
  label: string;
};

export type CharacteristicType = {
  id: string;
  name: string;
  isMandatory: boolean;
};

export type ProductOfferingType = {
  value: string;
  label: string;
  productOfferingObject: any;
  optionsCharacteristics: Array<CharacteristicType>;
  selectedCharacteristicsIds: Array<string>;
  quantity: number;
  generatedId?: string;
};

export type ProductOrderType = {
  id: string;
  locationId: string;
  firstname: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  offerings: Array<ProductOfferingType>;
};

export type NewCustomerOrderContextType = {
  // STEP 1
  account: OptionType;
  setAccount: React.Dispatch<React.SetStateAction<OptionType>>;
  contact: OptionType;
  setContact: React.Dispatch<React.SetStateAction<OptionType>>;
  // STEP 2
  locations: Array<OptionType>;
  setLocations: React.Dispatch<React.SetStateAction<Array<OptionType>>>;
  productOrders: Array<ProductOrderType>;
  setProductOrders: React.Dispatch<
    React.SetStateAction<Array<ProductOrderType>>
  >;
  selectedLocationId: string;
  setSelectedLocationId: React.Dispatch<React.SetStateAction<string>>;
  getSelectedProductOrder: (
    locationId?: string,
  ) => ProductOrderType | undefined;
  updateSelectedProductOrder: (
    propertyName: keyof ProductOrderType,
    propertyValue: any,
  ) => void;
  updateSelectedProductOrderOfferingById: (
    locationId: string,
    generatedId: string,
    updateOffering: any,
  ) => void;
  deleteProductOffering: (index: number) => void;
  deleteSelectedLocation: () => void;
  updateProductOrdersOnCreateOrder: (data: any) => void;
  orderDetails: any;
  // STEP 3
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  productOffering: string;
  setProductOffering: React.Dispatch<React.SetStateAction<string>>;
  productSpecification: string;
  setProductSpecification: React.Dispatch<React.SetStateAction<string>>;
  orderedQuantity: string;
  setOrderedQuantity: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  noneRecuringChangesPerUnit: number;
  setNoneRecuringChangesPerUnit: React.Dispatch<React.SetStateAction<number>>;
  monthlyRecurringChangesPerUnit: number;
  setMonthlyRecurringChangesPerUnit: React.Dispatch<
    React.SetStateAction<number>
  >;
};

export const NewCustomerOrderContext = createContext(
  {} as NewCustomerOrderContextType,
);

const NewCustomerOrderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // STEP 1
  const [account, setAccount] = useState({} as OptionType);
  const [contact, setContact] = useState({} as OptionType);
  // STEP 2
  const [locations, setLocations] = useState([] as OptionType[]);

  const [productOrders, setProductOrders] = useState([] as ProductOrderType[]);

  const [selectedLocationId, setSelectedLocationId] = useState("");

  const [orderDetails, setOrderDetails] = useState();
  // STEP 3
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [productOffering, setProductOffering] = useState("");
  const [productSpecification, setProductSpecification] = useState("");
  const [orderedQuantity, setOrderedQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(1);
  const [noneRecuringChangesPerUnit, setNoneRecuringChangesPerUnit] =
    useState(1);
  const [monthlyRecurringChangesPerUnit, setMonthlyRecurringChangesPerUnit] =
    useState(1);

  const getSelectedProductOrder = (locationId?: string) => {
    const targetedLocationId = locationId || selectedLocationId;
    let productOrderFound = productOrders.find(
      (productOrdersItem) =>
        productOrdersItem.locationId === targetedLocationId,
    );

    if (!productOrderFound) {
      // add a new product order with selected location to productOrders
      productOrderFound = {
        id: uuidv4(),
        locationId: targetedLocationId,
        firstname: "",
        lastname: "",
        email: "",
        mobilenumber: "",
        offerings: [],
      };
      productOrders.push(productOrderFound);
    }

    return productOrderFound;
  };

  const updateSelectedProductOrder = (
    propertyName: keyof ProductOrderType,
    propertyValue: any,
  ) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.locationId === selectedLocationId) {
            return {
              ...previousProductOrdersItem,
              [propertyName]: propertyValue,
            };
          } else {
            return previousProductOrdersItem;
          }
        },
      );
    });
  };

  const updateSelectedProductOrderOfferingById = (
    locationId: string,
    generatedId: string,
    updateOffering: any,
  ) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.locationId === locationId) {
            return {
              ...previousProductOrdersItem,
              offerings: previousProductOrdersItem.offerings.map(
                (offering: any) =>
                  offering.generatedId === generatedId
                    ? { ...offering, ...updateOffering }
                    : offering,
              ),
            };
          } else {
            return previousProductOrdersItem;
          }
        },
      );
    });
  };

  const deleteProductOffering = (index: number) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.locationId === selectedLocationId) {
            return {
              ...previousProductOrdersItem,
              offerings: previousProductOrdersItem.offerings.filter(
                (offering, index2) => index !== index2,
              ),
            };
          } else {
            return previousProductOrdersItem;
          }
        },
      );
    });
  };

  const deleteSelectedLocation = () => {
    const tmp = locations.filter(
      (location) => location.value !== selectedLocationId,
    );
    setLocations(tmp);
    setProductOrders(
      productOrders.filter(
        (productOrder) => productOrder.locationId !== selectedLocationId,
      ),
    );
    const firstLocation = tmp[0]?.value;
    setSelectedLocationId(firstLocation || "");
  };

  const updateProductOrderByLocationId = (
    locationId: string,
    id: string,
    productSpecification: any,
    productOffering: any,
  ) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.locationId === locationId) {
            return {
              ...previousProductOrdersItem,

              offerings: previousProductOrdersItem.offerings.map(
                (offering: ProductOfferingType) => {
                  if (offering.value === productOffering.id) {
                    return {
                      ...offering,
                      generatedId: id,
                      productOfferingObject: {
                        ...offering.productOfferingObject,
                        productSpecification,
                        sys_id: productOffering.sys_id,
                        internalVersion: productOffering.internalVersion,
                        version: productOffering.version,
                        status: productOffering.status,
                        internalId: productOffering.internalId,
                      },
                    };
                  }
                  return offering;
                },
              ),
            };
          } else {
            return previousProductOrdersItem;
          }
        },
      );
    });
  };

  const updateProductOrdersOnCreateOrder = (data: any) => {
    setOrderDetails(data.orderDetails);

    for (let i = 0; i < data.items.length; i++) {
      const currentItem = data.items[i];
      updateProductOrderByLocationId(
        currentItem.locationId,
        currentItem.id,
        currentItem.productSpecification,
        currentItem.productOffering,
      );
    }
  };

  return (
    <NewCustomerOrderContext.Provider
      value={{
        // STEP 1
        account,
        setAccount,
        contact,
        setContact,
        // STEP 2
        locations,
        setLocations,
        productOrders,
        setProductOrders,
        selectedLocationId,
        setSelectedLocationId,
        getSelectedProductOrder,
        updateSelectedProductOrder,
        updateSelectedProductOrderOfferingById,
        deleteProductOffering,
        deleteSelectedLocation,
        updateProductOrdersOnCreateOrder,
        orderDetails,
        // STEP 3
        number,
        setNumber,
        location,
        setLocation,
        productOffering,
        setProductOffering,
        productSpecification,
        setProductSpecification,
        orderedQuantity,
        setOrderedQuantity,
        totalPrice,
        setTotalPrice,
        noneRecuringChangesPerUnit,
        setNoneRecuringChangesPerUnit,
        monthlyRecurringChangesPerUnit,
        setMonthlyRecurringChangesPerUnit,
      }}
    >
      {children}
    </NewCustomerOrderContext.Provider>
  );
};

export default NewCustomerOrderContextProvider;
