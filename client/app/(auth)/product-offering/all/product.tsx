"use client";

import { FormEventHandler, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";
import * as dotenv from "dotenv";
import Link from "next/link";
import IProductOfferingDocument from "../../../../../server/models/product-offering/IProductOffering";
import Modal from "./Modal";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;


interface ProductProps {
  product: IProductOfferingDocument,
  specifications: {
    _id: string;
    name: string;
    id: string;
    version: string;
    internalVersion: string;
    internalId: string;
  }[]
}

const Product: React.FC<ProductProps> = ({ product , specifications }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
 
  const [productName, setProductName] = useState<String>(product.name);
  const [productDescription, setProductDescription] = useState<String>(
    product.description,
  );
  const [productID, setProductID] = useState<String>(product._id);
  const [openModalRetired, setOpenModalRetired] = useState<boolean>(false);
  const [openModalPublish, setOpenModalPublish] = useState<boolean>(false);
  const [category, setCategory] = useState<{ id: string; name?: string }[]>(
    product.category,
  );
 

  const [productSpecifications, setProductSpecifications] = useState<
    {
      _id: string;
      name: string;
      id: string;
      version: string;
      internalVersion: string;
      internalId: string;
    }[]
  >(specifications);
  
  
  
 /* oussama : this updates in mongodb , because there is no PATCH End Point 
  */
  const handleSubmitEditProOf: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {

      const id = product.id;
      const productSpecificationId = formData.get('product-specification');

      /* oussama : get the product specification complete data so that it can be inserted in mongoDB
      */
     const productSpecificationDetails = await getProductSpecificationDetails(productSpecificationId);

     console.log("product specification details : ", productSpecificationDetails);
    
    const po = {
        name: formData.get('product-offering-name'),
        description: formData.get('product-offering-des') ,
        productSpecification: productSpecificationDetails ,
      };
      try {
        
        const productOffering = await axios
          .get(`${AXIOS_URL}/api/product-offering/${id}`)
          .then((res) => res.data)
          .catch((e) => console.log(e));

        const poId = productOffering._id;
        


        const updatePo = await axios
          .patch(`${AXIOS_URL}/api/product-offering/update/${poId}`, po)
          .then((res) => res.data)
          .catch((error) => console.log({ error }));

       
        setModalOpen(false);
        window.location.reload();
      
      } catch (e) {
        console.log("Axios error:", e);
      }
      
      
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any other errors
    }
  };

  // oussama : helper function 
  const getProductSpecificationDetails = async (specId : any) => {
        try {
        const res = await fetch(`${AXIOS_URL}/api/product-specification/id/${specId}`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch product specifications : ${res.status} ${res.statusText}`,
          );
        }
        const details = await res.json();
        const {_id , name , version , internalVersion , internalId} = details;
      
        
        return {_id , name , version , internalVersion , internalId};
     
        }catch (error) {
          console.log(error);
        }
  }

  const handleSubmitEditPublish: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      const id = product.internalId;
      console.log(id);

      const url = `${AXIOS_URL}/api/product-offering/publish/servicenow/${id}`;
      const response = await axios.patch(url);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Done",
          text: response.data.message,
        });
      }
      setOpenModalPublish(false);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      // Handle the successful response
    } catch (error: any) {
      console.error("An error occurred:", error);
      // Anass: fixing an issue while publishing a product offering...
      if (
        (error.response &&
          (error.response.status >= 400 || error.response.status <= 500)) ||
        axios.isAxiosError(error)
      ) {
        const axiosError = error as AxiosError;
        Swal.fire({
          icon: "error",
          title: "Error...",
          text:
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : axiosError.message,
        });
      }

      
    }
  };

  const handleSubmitEditRe: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
   
    try {
   
      const poExternalId = product.internalId;
      const response = await axios.patch(
        `${AXIOS_URL}/api/product-offering/retire/${poExternalId}`,
      );

      console.log("Updated Product Offering:", response.data);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Done",
          text: response.data.message,
        });
      }
      setModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error: any) {
      console.log("Axios error:", error);
      if (
        error.response ||
        error.response.status >= 400 ||
        error.response.status <= 500 ||
        axios.isAxiosError(error)
      ) {
        const axiosError = error as AxiosError;
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: error.response.data.message
            ? error.response.data.message
            : axiosError,
        });
      }
    }
  };

  return (
    <tr key={product.id}>
      {/* <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => setModalOpenView(true)}
      >
        {product.number}
      </td> */}
      <td className="px-6 py-4">{product.name}</td>
      <td className="px-6 py-4">{product.description}</td>
      <td className="px-6 py-4">
        {product.productSpecification
          ? product.productSpecification.name
          : "Product Specification Name"}
      </td>

      {/* Anass: fixed product offerings table... */}
      <td className="px-6 py-4">{product.internalVersion}</td>
      <td className="px-6 py-4">{product.status}</td>
      <td className="px-6 py-4">
        {product.validFor ? product.validFor.startDateTime : "N/A"}
      </td>
      <td
        className="px-6 py-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        
        {product.status === "draft" || product.status === "In Draft" ? (
          <button
            className="btn btn-sm btn-info"
            onClick={() => setModalOpen(true)}
          >
            Update
          </button>
        ) : null}
        &nbsp;
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitEditProOf}>
            <h3 className="font-bold text-lg">Edit product</h3>
            <div className="grid">
              <div className="input-group grid my-3">
                <label htmlFor="product-offering-name" className="mb-2">
                  Display name
                </label>
                <input
                  value={productName.toString()}
                  onChange={(e) => setProductName(e.target.value)}
                  name="product-offering-name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="input-group grid my-3">
                <label htmlFor="product-specification" className="mb-2">
                  Product Specification
                </label>
                <select
                  name="product-specification"
                  id="prod-spec"
                  className="py-3 px-2 bg-white rounded flex items-center"
                >
                  {productSpecifications.map((prodSpec) => {
                    return (
                      <option value={prodSpec._id}>{prodSpec.name}</option>
                    );
                  })}
                </select>
              </div>
              <div className="grid">
                <div className="input-group grid my-3">
                  <label htmlFor="product-offering-name" className="mb-2">
                    Description
                  </label>
                  <input
                    value={productDescription.toString()}
                    onChange={(e) => setProductDescription(e.target.value)}
                    name="product-offering-des"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="btn">
                Update
              </button>
              &nbsp;
            </div>
          </form>
        </Modal>
        {product.status === "draft" || product.status === "In Draft" ? (
          
          <button
            className="btn btn-sm btn-success"
            onClick={() => setOpenModalPublish(true)}
          >
            Publish
          </button>
        ) : null}
        &nbsp;
        <Modal modalOpen={openModalPublish} setModalOpen={setOpenModalPublish}>
          <form onSubmit={handleSubmitEditPublish}>
            <h3 style={{ color: "black", textAlign: "center" }}>
              Are you sure, you want to Publish this product?
            </h3>
            <div className="modal-action">
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="button"
                onClick={() => setOpenModalPublish(false)}
                className="btn"
              >
                Cancel
              </button>
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="submit"
                className="btn"
              >
                Publish
              </button>
            </div>
          </form>
        </Modal>
        {product.status === "Published" || product.status === "published" ? (
          
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setOpenModalRetired(true)}
          >
            Retire
          </button>
        ) : null}
        &nbsp;
        <Modal modalOpen={openModalRetired} setModalOpen={setOpenModalRetired}>
          <form onSubmit={handleSubmitEditRe}>
            <h3 style={{ color: "black", textAlign: "center" }}>
              Are you sure, you want to Retired this product?
            </h3>
            <div className="modal-action">
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="button"
                onClick={() => setOpenModalRetired(false)}
                className="btn"
              >
                Cancel
              </button>
              <button
                style={{ display: "flex", justifyContent: "center" }}
                type="submit"
                className="btn"
              >
                Retired
              </button>
            </div>
          </form>
        </Modal>
      
        <Link
          href={`/product-offering/${productID}`}
          className="btn btn-sm btn-active"
        >
          View
        </Link>
       
      </td>
    </tr>
  );
};
export default Product;
