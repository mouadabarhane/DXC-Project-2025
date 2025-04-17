"use client";

import { useContext, useEffect, useState } from "react";
// import { type } from "os";
import ItemDetails from "./ItemDetails";
import { NewCustomerOrderContext } from "../context/new-customer-order-context";

const COLUMNS = [
  { title: "Numbers" },
  { title: "Product Offering" },
  { title: "Product Specification" },
  { title: "Ordered Quantity" },
  { title: "Location" },
  { title: "Price" },
];

const DATA = Array(5)
  .fill(0)
  .map((_, i) => ({
    number: "ORDL00099" + i,
    productOffering: "Premium SD WAN OFFERING " + i,
    productSpecification: "SD WAN SERVICE PACKAGE " + i,
    orderedQuantity: 1,
    location: "100 south charles street Batiment MD " + i,
  }));
type OrderItemType = {
  number: string;
  productOffering: string;
  productSpecification: string;
  orderedQuantity: number;
  location: { id: string; name: string };
  price: number;
};
export default function ReviewOrder() {
  const myContext = useContext(NewCustomerOrderContext);

  const [orderItems, setOrderItems] = useState<OrderItemType[]>();
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItemType>();
  useEffect(() => {
    const tmp: OrderItemType[] = [];

    for (let i = 0; i < myContext?.productOrders.length; i++) {
      const currentProductOrder = myContext?.productOrders[i];

      const locationFound = myContext.locations.find(
        (location) => location.value === currentProductOrder.locationId,
      );

      for (let j = 0; j < currentProductOrder?.offerings.length; j++) {
        const currentOffering = currentProductOrder?.offerings[j];
        tmp.push({
          number: currentOffering.generatedId as string,
          productOffering: currentOffering.label,
          productSpecification:
            currentOffering.productOfferingObject?.productSpecification?.name,
          orderedQuantity: currentOffering.quantity,
          location: {
            id: locationFound?.value as string,
            name: locationFound?.label as string,
          },
          price:
            ((currentOffering?.productOfferingObject?.productOfferingPrice?.[0]
              ?.price?.taxIncludedAmount?.value || 0) +
              (currentOffering?.productOfferingObject?.productOfferingPrice?.[1]
                ?.price?.taxIncludedAmount?.value || 0)) *
            (currentOffering.quantity || 1),
        });
      }
    }
    setOrderItems(tmp);
  }, [myContext?.productOrders]);

  const handleOrderItemOnClick = (index: number) => {
    setSelectedOrderItem(orderItems?.[index]);
  };
  const handleSelectedOrderItemOnClose = () => {
    setSelectedOrderItem(undefined);
  };

  return (
    <div className="review-order w-full p-4">
      <h4 className="font-extrabold">Order summary</h4>
      <div className="flex gap-2 items-center p-2">
        <div>Order items count </div>
        <div className="bg-[#5f249f] w-8 h-8 flex justify-center items-center text-white  rounded-[50%] p-2">
          {orderItems?.length}
        </div>
      </div>
      <div className="flex gap-4">
        <table className="table-auto w-full border-2">
          <thead>
            <tr className="border-2">
              {COLUMNS.map((column) => (
                <th className="border-r p-2 whitespace-nowrap">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((item, index) => (
              <tr
                className="border-2 text-center cursor-pointer hover:bg-[#ebebeb]"
                onClick={() => handleOrderItemOnClick(index)}
              >
                <td className="border-r p-2">{item.number}</td>
                <td className="border-r p-2">{item.productOffering}</td>
                <td className="border-r p-2">{item.productSpecification}</td>
                <td className="border-r p-2">{item.orderedQuantity}</td>
                <td className="border-r p-2">{item.location.name}</td>
                <td className="border-r p-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {selectedOrderItem && (
            <ItemDetails
              item={selectedOrderItem}
              onClose={handleSelectedOrderItemOnClose}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end border-t-2 mt-2 p-2">
        <div className="p-2 rounded-[5px] bg-[#c19de8] text-white">
          Total price{" "}
          {orderItems?.reduce((total, current) => total + current.price, 0)} USD
        </div>
      </div>
    </div>
  );
}
