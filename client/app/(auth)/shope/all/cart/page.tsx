"use client";
import React from "react";
import CartItemCard from "../../components/CartItemCard";
import { TotalPriceSelector } from "../../store/features/cartSlice";
import { useAppSelector } from "../../store/store";
import Header from "../../components/Header";
import Sliderpro from "../../components/Sliderpro";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const totalPrice = useAppSelector(TotalPriceSelector);
  return (
    <div className="p-2">
      <div>
        <Header />

        {/* <div className="sliderAx h-auto"> */}
        {/* <Sliderpro /> */}
        {/* </div> */}
      </div>
      <div>
        <h1 className="text-center text-blue-700 text-4xl font-bold my-5">
          Favorites List
        </h1>
      </div>

      {cartItems.map((item) => (
        <CartItemCard cartItem={item} />
      ))}

      <p className="text-slate-600">
        Total Price:{" "}
        <span className="text-slate-900 font-bold">{totalPrice} $</span>
      </p>
    </div>
  );
};

export default CartPage;
