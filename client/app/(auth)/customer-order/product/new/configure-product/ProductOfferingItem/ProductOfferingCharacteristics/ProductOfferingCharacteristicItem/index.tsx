import React, { useEffect, useState } from "react";

export default function ProductOfferingCharacteristicItem({
  item,
  onSelect,
  isSelected,
}: any) {
  return (
    <div
      onClick={onSelect}
      className={`p-1 pb-0 pl-8 border-b-2 cursor-pointer ${
        isSelected ? "border-l-2 border-l-[#2c755e] bg-[#daeae7]" : ""
      }`}
    >
      {item.name}
    </div>
  );
}
