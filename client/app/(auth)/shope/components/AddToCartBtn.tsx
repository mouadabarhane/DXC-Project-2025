"use client";

import React from "react";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Product } from "../interfaces";
import {
  decrement,
  increment,
  productQtyInCartSelector,
} from "../store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Button } from "./elements";
import QtyBtn from "./QtyBtn";
import LoveBtn from "./LoveBtn";

interface Props {
  product: Product;
}

const AddToCartBtn = (props: Props) => {
  const qty = useAppSelector((state) =>
    productQtyInCartSelector(state, props.product.id),
  );
  const dispatch = useAppDispatch();
  if (!qty)
    return (
      // <div className="flex justify-center">
      <div className="">
        {/* <Button onClick={() => dispatch(increment(props.product))}>
          Add To Cart
        </Button> */}
        <Button onClick={() => dispatch(increment(props.product))}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                               
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      
                        
                        </svg> */}
          <div className="transition ease-in duration-300 bg-white hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
            <HeartIcon className="" />
          </div>
        </Button>
      </div>
    );
  return (
    // <QtyBtn
    //   onDecrease={() => dispatch(decrement(props.product))}
    //   onIncrease={() => dispatch(increment(props.product))}
    //   qty={qty}
    // />
    <LoveBtn
      onDecrease={() => dispatch(decrement(props.product))}
      onIncrease={() => dispatch(increment(props.product))}
      qty={qty}
    />
    // {/* <div className="flex gap-2 justify-center items-center">
    //       <Button variant="danger" className="w-12 h-10" onClick={props.onDecrease}>
    //         {/* {props.qty === 1 ? <TrashIcon className="w-4" /> : "-"} */}
    //         <TrashIcon className="w-4" />
    //       </Button>
    //       <p>{props.qty}</p>
    //       <Button
    //         className="w-12 h-10"
    //         variant="success"
    //         onClick={props.onIncrease}
    //       >
    //         <HeartIcon className="" />
    //         {/* + */}
    //       </Button>
    //     </div> */}
  );
};

export default AddToCartBtn;
