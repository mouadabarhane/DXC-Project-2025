"use client";

import axios from "axios";
import * as dotenv from "dotenv";

import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";
import ProductOfferingHeader from "./components/header";
import ProductOfferingInfos from "./components/infos";
import ProductSpecification from "./components/productSpecification";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export default async function SingleProductOfferingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const productOffering = await axios(`${AXIOS_URL}/api/product-offering/${id}`)
    .then((response) => response.data)
    .catch((e) => console.log(e));

  return (
    <div className="flex">
      <Sidebar />
      <div className="product-offering container mx-auto">
        <Header />
        <ProductOfferingHeader productOffering={productOffering} />
        <ProductOfferingInfos productOffering={productOffering} />
        <div className="relative">
          <ProductSpecification
            internalId={productOffering.productSpecification.internalId}
          />
        </div>
      </div>
    </div>
  );
}
