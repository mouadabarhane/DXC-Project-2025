"use client";
import Image from "next/image";
import React, { useState, useEffect, ReactNode } from "react";

// Initialization for ES Users
// import { Carousel, initTE } from "tw-elements";

const Sliderpro = () => {
  // initTE({ Carousel });
  return (
    <div>Slider Pro</div>
    // <div
    //   id="carouselExampleCaptions"
    //   className="relative w-100 h-100 p-3"
    //   data-te-carousel-init
    //   data-te-carousel-slide
    // >
    //   <div
    //     className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
    //     data-te-carousel-indicators
    //   >
    //     <button
    //       type="button"
    //       data-te-target="#carouselExampleCaptions"
    //       data-te-slide-to="0"
    //       data-te-carousel-active
    //       className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
    //       aria-current="true"
    //       aria-label="Slide 1"
    //     ></button>
    //     <button
    //       type="button"
    //       data-te-target="#carouselExampleCaptions"
    //       data-te-slide-to="1"
    //       className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
    //       aria-label="Slide 2"
    //     ></button>
    //     <button
    //       type="button"
    //       data-te-target="#carouselExampleCaptions"
    //       data-te-slide-to="2"
    //       className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
    //       aria-label="Slide 3"
    //     ></button>
    //   </div>
    //   <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
    //     <div
    //       className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
    //       data-te-carousel-fade
    //       data-te-carousel-item
    //       data-te-carousel-active
    //     >
    //       {/* <div>
    //   <video src="https://tecdn.b-cdn.net/img/video/Tropical.mp4" loop autoPlay muted className="h-[300px] w-auto" ></video>
    //   </div> */}
    //       <div className="w-full ">
    //         <div className="h-80">
    //           <video className="w-full" loop autoPlay muted>
    //             <source
    //               // src="../video/DXC_Pre-Launch_Teaser_1920x600-0x360-730k.mp4"
    //               src="https://dxc.scene7.com/is/content/dxc/DXC_Pre-Launch_Teaser_1920x600-0x360-730k"
    //               type="video/mp4"
    //             />
    //           </video>
    //         </div>
    //       </div>

    //       <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
    //         <h5 className="text-xl">DXC and Manchester United</h5>
    //         <p>WE ARE ALL THE DXC BRAND.</p>
    //       </div>
    //     </div>
    //     <div
    //       className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
    //       data-te-carousel-fade
    //       data-te-carousel-item
    //     >
    //       {/* <video className="w-full" loop autoPlay muted >
    //     <source
    //       src="https://dms.licdn.com/playlist/vid/D5605AQFy5De937yWdA/mp4-720p-30fp-crf28/0/1677063626327?e=1689303600&v=beta&t=3o13Ci4F2W82fSkocSThSIQ3ybcjAnaJBv-A7RJnURs"
    //       type="video/mp4" />
    //   </video> */}
    //       <div className="w-full ">
    //         <div className="h-80">
    //           <div className="h-full ...">
    //             <Image
    //               src="https://store.dxc.com/cdn/shop/files/unnamed_1000x.jpg?v=1631219716"
    //               className="block w-full"
    //               alt="..."
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
    //         <h5 className="text-xl">Need Custom Products?</h5>
    //         <p>WE ARE ALL THE DXC BRAND.</p>
    //       </div>
    //     </div>

    //     <div
    //       className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
    //       data-te-carousel-fade
    //       data-te-carousel-item
    //     >
    //       <div className="w-full ">
    //         <div className="h-80">
    //           <video className="w-full" loop autoPlay muted>
    //             <source
    //               src="https://dms.licdn.com/playlist/vid/C5605AQG8SWuTo3pH4w/mp4-720p-30fp-crf28/0/1680188464293?e=1689357600&v=beta&t=p6fwo39xJ1BrO_3R7brBFRV-pRqvMSB4N9RJCz4kmsU"
    //               type="video/mp4"
    //             />
    //           </video>
    //           {/* <img
    //     src="https://dxc.scene7.com/is/image/dxc/home_may_w:banner_desktop"
    //     className="block w-full"
    //     alt="..." /> */}
    //         </div>
    //       </div>

    //       <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
    //         <h5 className="text-xl">
    //           Technology, Media and Telecommunications
    //         </h5>
    //         <p>
    //           Redefine the customer experience, capitalize on digital
    //           convergence and quickly launch new business models in rapidly
    //           changing markets.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <button
    //     className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    //     type="button"
    //     data-te-target="#carouselExampleCaptions"
    //     data-te-slide="prev"
    //   >
    //     <span className="inline-block h-8 w-8">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke-width="1.5"
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           d="M15.75 19.5L8.25 12l7.5-7.5"
    //         />
    //       </svg>
    //     </span>
    //     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //       Previous
    //     </span>
    //   </button>
    //   <button
    //     className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    //     type="button"
    //     data-te-target="#carouselExampleCaptions"
    //     data-te-slide="next"
    //   >
    //     <span className="inline-block h-8 w-8">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke-width="1.5"
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           d="M8.25 4.5l7.5 7.5-7.5 7.5"
    //         />
    //       </svg>
    //     </span>
    //     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //       Next
    //     </span>
    //   </button>
    // </div>
  );
};

const styleA = {
  background: `rgba(0, 0, 0, 0.3)`,
};
const styleAJ = {
  background: `rgba(0, 0, 0, 0.3)`,
};
const styleAk = {};
const styleB = {
  background: `linear-gradient( 45deg, rgba(29, 236, 197, 0.7),rgba(91, 14, 214, 0.7) 100%)`,
  transform: `rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)`,
};

export default Sliderpro;
