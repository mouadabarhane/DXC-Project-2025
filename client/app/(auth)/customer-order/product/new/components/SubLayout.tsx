import React from "react";

type SubLayoutType = {
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  bottomChildren: React.ReactNode;
};

export default function SubLayout({
  leftChildren,
  rightChildren,
  bottomChildren,
}: SubLayoutType) {
  return (
    <div className="flex flex-col px-4 w-full">
      <div className="flex">
        <div className="w-1/4 border-r-2 border-gray-500 p-4">
          {leftChildren}
        </div>
        <div className="flex flex-col p-4 gap-8 w-full">{rightChildren}</div>
      </div>
      <div className="flex justify-end border-t-2 border-gray-500 p-4">
        {bottomChildren}
      </div>
    </div>
  );
}
