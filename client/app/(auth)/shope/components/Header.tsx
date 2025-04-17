import Link from "next/link";
import React from "react";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import CartBtn from "./CartBtn";
import Sliderpro from "./Sliderpro";

const Header = () => {
  return (
    <header className="h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 border shadow p-2 flex">
      <Link className="text-sky-600" href={"/shope/all"}>
        <BuildingStorefrontIcon className="transition ease-in duration-300 bg-white hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1" />
        {/* <h1> Products Offring Store</h1> */}
      </Link>

      <Link className="ml-auto mr-4" href={"/shope/all/cart"}>
        <CartBtn />
      </Link>
      <div>{/* <div><Sliderpro /></div> */}</div>
    </header>
  );
};

export default Header;
