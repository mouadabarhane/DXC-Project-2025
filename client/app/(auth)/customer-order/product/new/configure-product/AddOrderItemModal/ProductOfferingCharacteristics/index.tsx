import React, { useEffect, useState } from "react";
import ProductOfferingCharacteristicItem from "./ProductOfferingCharacteristicItem";

export default function ProductOfferingCharacteristics({
  location,
  offerings,
  selectedItem,
  setSelectedItem,
}: any) {
  return (
    <div>
      <div className="text-slate-400 font-bold">{location?.label}</div>
      <div>
        {offerings.map((offering: any) => {
          const characteristics = offering.optionsCharacteristics?.map(
            (characteristic: any) => {
              const wasSelected = offering.selectedCharacteristicsIds?.includes(
                characteristic.id,
              );

              return { ...characteristic, wasSelected };
            },
          );
          return (
            <div>
              <div className="text-slate-400 font-bold ml-2">
                {offering.productOfferingObject.productSpecification.name}
              </div>
              <ProductOfferingCharacteristicItem
                offering={offering}
                characteristics={characteristics}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                locationId={location?.value}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
