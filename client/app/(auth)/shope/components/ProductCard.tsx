//import Image from "next/image";
import React from "react";
import Image from "next/image";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import AddToCartBtn from "./AddToCartBtn";

const ProductCard = (props: any) => {
  return (
    <>
      {/* // <!--   ✅ Product card 2 - Starts Here 👇 --> */}
      <div className="w-172 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <div className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={styleA}
            // style="transform: scale(1.5); opacity: 0.1;"
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center">
            <div
              className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              style={styleB}
              // style="background: radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2;"
            ></div>
            {/* <img src="https://img.freepik.com/free-vector/distance-working-abstract-concept_335657-3049.jpg?w=826&t=st=1688607651~exp=1688608251~hmac=6376b983eec4a3c1a3f786b42e8e40760d633ec155a0de1aa1c1bba7679a48cc"
                    alt="Product" className="relative w-40" /> */}
            <Image
              //src={props.product.image}
              className="relative w-100"
              src="http://estomedia.com/images/two_remote_test.png"
              width={600}
              height={500}
              alt={props.product.name}
            />

            {/* <img className="relative w-40" src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png" alt=""/> */}
          </div>
          <div className="flex flex-col space-y-4 ...">
            <svg xmlns="" width="100" height="100">
              {/* <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" /> */}
            </svg>
          </div>

          {/* <button className="transition ease-in duration-300 bg-white hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">

                                            {/* <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              // stroke={
                                              //   savedProductOfferings.find(
                                              //     (p) =>
                                              //       p.productId === product._id,
                                              //   )
                                              //     ? "#34D399"
                                              //     : "#2c3e50"
                                              // }
                                              // onClick={() =>
                                              //   handleSaveButtonClick(
                                              //     product._id,
                                              //   )
                                              // }
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                              />
                                              
                                            </svg> */}

          {/* </button> */}
          <button className="">
            <AddToCartBtn product={props.product} />
          </button>
          {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
                                           style={styleZ}> */}

          {/* <style>svg{fill:#ad1018}</style> */}
          {/* <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM576 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-64 0c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16H496c8.8 0 16 7.2 16 16z"/>
                                          </svg> */}
        </div>
        {/* <img src="https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Product" className="h-80 w-72 object-cover rounded-t-xl" /> */}
        <div className="p-2">
          {props.product.category && props.product.category.length > 0 && (
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {props.product.category[0].name}
            </span>
          )}
          <div>
            <button
              className="font-bold text-black no-underline hover:underline decoration-sky-600 hover:decoration-blue-400 ..."
              onClick={() => {
                window.location.href = `/product-offering/${props.product._id}`;
              }}
            >
              <p className="text-center text-slate-600">{props.product.name}</p>
            </button>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {
                props.product.productOfferingPrice[0].price.taxIncludedAmount
                  .value
              }{" "}
              {
                props.product.productOfferingPrice[0].price.taxIncludedAmount
                  .unit
              }
            </p>
            {/* <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                        
                    </del> */}
            <div className="ml-auto">
              <button
                onClick={() => {
                  window.location.href = `/product-offering/${props.product._id}`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-4 ...">
            {/* <AddToCartBtn product={props.product} /> */}

            <div className="text-center text-slate-600 justify-between">
              <button
                onClick={() => {
                  window.location.href = `/product-offering/${props.product._id}`;
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <span>View Details</span>
              </button>

              {/* <button
        onClick={() => {
        window.location.href = `/customer-order/product/new/create-order`;
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
       <span>Order it now</span>
        </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* // <!--   🛑 Product card 2- Ends Here  --> */}

      {/* <div className="border rounded-md shadow hover:shadow-lg transition overflow-hidden ">
      <button className="select-auto ..." onClick={() => {
          window.location.href = `/product-offering/${props.product._id}`;}} >
      <img
        //src={props.product.image}
        src="https://dev146754.service-now.com/d576b8bf4f378200086eeed18110c722.iix"
        width={400}
        height={300}
        alt={props.product.name}
        
      />
      </button>
      <div className="p-2">
      <button className="no-underline hover:underline decoration-sky-600 hover:decoration-blue-400 ..." onClick={() => {
          window.location.href = `/product-offering/${props.product._id}`;}} >
        <h6 className="text-center text-slate-600">{props.product.name}</h6>
        </button>
        <p className="text-center text-slate-600">
          {props.product.productOfferingPrice[0].price.taxIncludedAmount.value}{" "}
          {props.product.productOfferingPrice[0].price.taxIncludedAmount.unit}  </p> */}

      {/* <button onClick={() => {window.location.href = `/product-offering/${props.product._id}`; }}
            className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600">
            <span>View Details</span>
            </button> */}

      {/* <div className="flex items-center mt-2.5 mb-5">
            <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>

            <button onClick={() => {window.location.href = `/product-offering/${props.product._id}`; }}
            className="transition ease-in duration-300 bg-gray-700 hover:bg-purple-800 border hover:border-purple-500 border-purple-700 hover:text-white  hover:shadow-lg text-purple-400 rounded-full w-9 h-9 text-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
        </div> */}

      {/* <div className="flex flex-col space-y-4 ...">
        <AddToCartBtn product={props.product} />
       

        <div className="text-center text-slate-600 justify-between"> */}
      {/* <button
        onClick={() => {
        window.location.href = `/customer-order/product/new/create-order`;
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
       <span>Order it now</span>
        </button> */}
      {/* </div>


       

      </div>
      </div> */}
      {/* </div> */}
    </>
  );
};

const styleA = {
  transform: `translate(${1}px, ${5}px)`,
  opacity: 0.1,
};
const styleB = {
  background: `radial-gradient(black, transparent 60%)`,
  transform: `rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)`,
  opacity: 0.2,
  // transform: `translate(${1}px, ${5}px)`,
  // opacity: 0.1
};
const styleZ = {
  fill: `#ad1018)`,
};

export default ProductCard;
