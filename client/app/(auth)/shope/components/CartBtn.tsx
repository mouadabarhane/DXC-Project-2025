"use client";

import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import {
  totalCartItemsSelector,
  TotalPriceSelector,
} from "../store/features/cartSlice";
import { useAppSelector } from "../store/store";

interface Props {
  className?: string;
}
const CartBtn = (props: Props) => {
  const totalItems = useAppSelector(totalCartItemsSelector);
  return (
    <div className={`${props.className} relative`}>
      {/* <HeartIcon className="w-9 text-slate-600" /> */}
      <HeartIcon className="transition ease-in duration-100 bg-white hover:text-red-600 shadow hover:shadow-md text-purple-600 rounded-full w-9 h-9 text-center p-1" />
      {!!totalItems && (
        <div
          key={totalItems}
          className="bg-red-500 flex justify-center items-center
        rounded-full w-6 absolute -top-2 -right-2 text-white animate-pingOnce
        "
        >
          {totalItems}
        </div>
      )}
    </div>
  );
};

export default CartBtn;
