import React, { useEffect, useState } from "react";

import InputText from "../../components/InputText";
import SelectInput from "../../components/SelectInput";

export default function ItemDetails({
  item,
  options,
  onCancel,
  onUpdate,
}: any) {
  const [currentOption, setCurrentOption] = useState<any>();

  useEffect(() => {
    setCurrentOption({ value: item.value, label: item.value });
  }, [item.value]);

  const handleSelectedOnChange = (option: any) => {
    console.log("handleSelectedOnChange", option);
    setCurrentOption(option);
  };
  const handleOnUpdate = () => {
    onUpdate({ name: item.name, value: currentOption.value });
  };
  return (
    <div className="create-order flex flex-col p-4 gap-4 w-full">
      <div className="flex justify-between w-full gap-4">
        <InputText
          slug="Characteristic"
          title="Characteristic"
          required={false}
          placeholder="Characteristic"
          value={item.name}
          disabled
        />

        <div className="flex flex-col">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Value
          </label>
          <SelectInput
            className="mt-2 w-[8em]"
            options={options}
            selected={[currentOption]}
            onChange={handleSelectedOnChange}
            isMulti={false}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          className="border bg-[#5f249f] text-white w-fit p-1 px-4 rounded-[5px] hover:opacity-80"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="border bg-[#5f249f] text-white w-fit p-1 px-4 rounded-[5px] hover:opacity-80"
          onClick={handleOnUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}
