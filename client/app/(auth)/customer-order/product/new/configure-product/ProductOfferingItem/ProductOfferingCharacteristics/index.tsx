import React, { useEffect, useState } from "react";
import ProductOfferingCharacteristicItem from "./ProductOfferingCharacteristicItem";

export default function ProductOfferingCharacteristics({
  items,
  onSelect,
  selected,
}: any) {
  const [charSpecs, setCharSpecs] = useState<any[]>([]);

  useEffect(() => {
    const tmp = [];
    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];
      tmp.push(currentItem.productSpecification.name);
    }
    setCharSpecs(tmp.filter((o, i, a) => a.findIndex((b) => b === o) === i));
  }, [items]);

  return (
    <div>
      {charSpecs?.map((charSpecName: any) => (
        <ProductOfferingCharacteristicItem
          item={{ name: charSpecName }}
          onSelect={() => onSelect(charSpecName)}
          isSelected={selected?.characteristicName === charSpecName}
        />
      ))}
    </div>
  );
}
