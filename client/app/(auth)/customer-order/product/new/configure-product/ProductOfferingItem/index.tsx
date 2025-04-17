import React, { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";

import ProductOfferingCharacteristics from "./ProductOfferingCharacteristics";

export default function ProductOfferingItem({ item, onSelect, selected }: any) {
  const [selectedCharcteristics, setSelectedCharcteristics] = useState([]);
  const [isMissingCharacteristicsValues, setIsMissingCharacteristicsValues] =
    useState(false);

  useEffect(() => {
    const mandatoryPlusSelectedCharacteristics =
      item?.optionsCharacteristics.filter(
        (characteristic: any) =>
          characteristic.isMandatory ||
          item?.selectedCharacteristicsIds?.includes(characteristic.id),
      );
    console.log(
      "mandatoryPlusSelectedCharacteristics",
      mandatoryPlusSelectedCharacteristics,
      item,
    );
    setIsMissingCharacteristicsValues(
      mandatoryPlusSelectedCharacteristics?.some(
        (characteristic: any) => !characteristic.value,
      ),
    );
    // characteristics(with all properties) that are selected
    const tmp2 = item?.productOfferingObject?.prodSpecCharValueUse.filter(
      (item: any) =>
        mandatoryPlusSelectedCharacteristics.find(
          (item2: any) => item2.name === item.name,
        ),
    );
    setSelectedCharcteristics(tmp2);
  }, [item]);
  console.log("current item", item);

  return (
    <div>
      <div
        className={`flex gap-2 items-center p-1 pb-0 pl-4 border-b-2 cursor-pointer ${
          selected?.offering?.generatedId === item?.generatedId &&
          !selected?.characteristicName
            ? "border-l-2 border-l-[#2c755e] bg-[#daeae7]"
            : ""
        }`}
        onClick={() => onSelect()}
      >
        <div>{item?.productOfferingObject?.productSpecification?.name} </div>
        {isMissingCharacteristicsValues && <BiError className="text-[red]" />}
      </div>
      <ProductOfferingCharacteristics
        items={selectedCharcteristics}
        onSelect={onSelect}
        selected={selected}
      />
    </div>
  );
}
