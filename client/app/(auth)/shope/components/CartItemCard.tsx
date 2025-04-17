import React from "react";
import Image from "next/image";
import { decrement, increment } from "../store/features/cartSlice";
import { useAppDispatch } from "../store/store";
import QtyBtn from "./QtyBtn";
import LoveBtn from "./LoveBtn";

const CartItemCard = ({ cartItem }: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-4 items-center py-2 border-b">
      <div>
        <Image
          //src={cartItem.product.image}
          src="http://estomedia.com/images/two_remote_test.png"
          width={200}
          height={150}
          alt={cartItem.product.name}
          className="rounded-md"
        />
        {/* <button onClick={() => {window.location.href = `/product-offering/${cartItem.product._id}`; }}
            className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600">
            <span>View Product Details</span>
            </button>*/}
        {/* <button onClick={() => {window.location.href = `/product-offering/${cartItem.product._id}`; }}
            className="transition ease-in duration-300 bg-gray-700 hover:bg-purple-800 border hover:border-purple-500 border-purple-700 hover:text-white  hover:shadow-lg text-purple-400 rounded-full w-9 h-9 text-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>  */}
      </div>
      <button
        className="no-underline hover:underline decoration-sky-600 hover:decoration-blue-400 ..."
        onClick={() => {
          window.location.href = `/product-offering/${cartItem.product._id}`;
        }}
      >
        <p className="text-slate-600 text-center">{cartItem.product.name}</p>
      </button>
      <div className="flex flex-col items-center justify-center gap-3">
        <p>
          {" "}
          {
            cartItem.product.productOfferingPrice[0].price.taxIncludedAmount
              .value
          }{" "}
          {
            cartItem.product.productOfferingPrice[0].price.taxIncludedAmount
              .unit
          }
        </p>
        <p>&#xd7;</p>
        {/* <QtyBtn
          qty={cartItem.qty}
          onDecrease={() => dispatch(decrement(cartItem.product))}
          onIncrease={() => dispatch(increment(cartItem.product))}
        /> */}
        <LoveBtn
          qty={cartItem.qty}
          onDecrease={() => dispatch(decrement(cartItem.product))}
          onIncrease={() => dispatch(increment(cartItem.product))}
        />
      </div>
      <div className="flex flex-col space-y-4 ...">
        <p className="text-center">
          {cartItem.qty *
            cartItem.product.productOfferingPrice[0].price.taxIncludedAmount
              .value}{" "}
          {
            cartItem.product.productOfferingPrice[0].price.taxIncludedAmount
              .unit
          }
        </p>
        {/* <div className="text-center text-slate-600 justify-between">
        <button
        onClick={() => {
        window.location.href = `/customer-order/product/new/create-order`;
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
       <span>Proceed to Checkout</span>
        </button>
        </div> */}
        <button
          onClick={() => {
            window.location.href = `/product-offering/${cartItem.product._id}`;
          }}
          className="transition ease-in duration-300  items-center text-sm  mb-2 md:mb-0 bg-purple-500 px-7 py-4  hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
        >
          View Product Details
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
