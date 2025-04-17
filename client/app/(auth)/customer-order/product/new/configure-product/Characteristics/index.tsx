import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ItemDetails from "./ItemDetails";

const COLUMNS = [
  { id: "001", title: "Characteristic" },
  { id: "002", title: "Characteristic value" },
];

export default function Characteristics({
  characteristics,
  offering,
  onCharacteristicValueChange,
}: any) {
  const [selectedItem, setSelectedItem] = useState<any>();

  const handleItemOnClick = (item: any) => {
    console.log("handleItemOnClick", item);
    setSelectedItem(item);
  };
  const handleItemOnClose = () => {
    setSelectedItem(undefined);
  };

  const getOptions = () => {
    const tmp = offering.productOfferingObject.prodSpecCharValueUse.find(
      (characteristic: any) => characteristic.name === selectedItem.name,
    );

    return (
      tmp?.productSpecCharacteristicValue?.map((option: any) => ({
        value: option.value,
        label: option.value,
      })) || []
    );
  };

  const handleCharacteristicValueOnChange = (option: any) => {
    onCharacteristicValueChange(option);

    setSelectedItem(undefined);
  };

  return (
    <div className="flex gap-4">
      <table className="table-auto w-full border-2 h-fit">
        <thead>
          <tr className="border-2">
            {COLUMNS.map((column) => (
              <th className="border-r p-2 whitespace-nowrap">{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {characteristics?.map((item: any) => (
            <tr className="border-2 text-center hover:bg-[#ebebeb]">
              <td className="border-r p-2">{item.name}</td>
              <td className="border-r p-2 flex gap-2 justify-center items-center">
                {item.value ? (
                  item.value
                ) : (
                  <div className="text-red-700">required</div>
                )}
                <AiOutlineEdit
                  className="cursor-pointer"
                  onClick={() => handleItemOnClick(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selectedItem && (
          <ItemDetails
            item={selectedItem}
            options={getOptions()}
            onCancel={handleItemOnClose}
            onUpdate={handleCharacteristicValueOnChange}
          />
        )}
      </div>{" "}
    </div>
  );
}
