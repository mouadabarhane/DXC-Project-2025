import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import { ProductOfferingType } from "../context/new-customer-order-context";

type PropsType = {
  options: ProductOfferingType[];
  selected: ProductOfferingType;
  onChange: (option: ProductOfferingType, isQuantityUpdate?: boolean) => void;
  onDelete: () => void;
};

export default function ProductOfferingItem({
  options,
  selected,
  onChange,
  onDelete,
}: PropsType) {
  const handleSelectedOnChange = (option: any) => {
    onChange({ ...selected, ...option });
  };
  const handleQuantityOnChange = (value: string) => {
    let tmp = value;
    if (value === "") {
      tmp = "1";
    }
    onChange({ ...selected, quantity: parseInt(tmp) }, true);
  };
  return (
    <div className="flex justify-center gap-4 p-4 border-2 rounded-md">
      <div className="sm:col-span-3 w-full">
        <label className="block text-xs font-medium leading-6 text-gray-900">
          Offering *
        </label>
        <SelectInput
          className="mt-2 w-full"
          options={options}
          selected={[selected]}
          onChange={handleSelectedOnChange}
          isMulti={false}
        />
      </div>
      <InputText
        slug="quantity"
        title="Quantity"
        required={true}
        placeholder="Quantity"
        value={selected?.quantity}
        onChange={handleQuantityOnChange}
      />
      <BsFillTrash3Fill
        className="cursor-pointer text-[28px]"
        onClick={onDelete}
      />
    </div>
  );
}
