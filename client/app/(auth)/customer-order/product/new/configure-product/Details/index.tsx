import React from "react";

import InputText from "../../components/InputText";

export default function Details({ selected, handleQuantityOnChange }: any) {
  return (
    <div>
      <div>
        <h4 className="font-extrabold">Order Line Item</h4>
        <div>
          <div className="flex justify-center gap-4">
            <InputText
              slug="number"
              title="Number"
              required={false}
              placeholder="Number"
              value={selected?.offering?.generatedId}
              disabled={true}
            />
            <InputText
              slug="Location"
              title="Location"
              required={false}
              placeholder="Location"
              value={selected?.location.label}
              disabled={true}
            />
          </div>
          <div className="flex justify-center gap-4">
            <InputText
              slug="Product Offering"
              title="Product Offering"
              required={false}
              placeholder="Product Offering"
              value={selected?.offering?.label}
              disabled={true}
            />
            <InputText
              slug="Product Specification"
              title="Product Specification"
              required={false}
              placeholder="Product Specification"
              value={
                selected?.offering?.productOfferingObject?.productSpecification
                  ?.name
              }
              disabled={true}
            />
          </div>
          <div className="flex justify-center gap-4 w-1/2 pr-2">
            <InputText
              slug="Ordered Quantity"
              title="Ordered Quantity"
              required={false}
              placeholder="Ordered Quantity"
              value={selected?.offering?.quantity}
              onChange={handleQuantityOnChange}
            />
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-extrabold">Pricing</h4>
        <div className="flex justify-center gap-4">
          <InputText
            slug="Monthly Recurring Changes Per Unit"
            title={`Monthly Recurring Changes Per Unit (${selected?.offering?.productOfferingObject?.productOfferingPrice?.[0]?.price?.taxIncludedAmount?.unit})`}
            required={false}
            placeholder="Monthly Recurring Changes Per Unit"
            value={
              selected?.offering?.productOfferingObject?.productOfferingPrice[0]
                .price.taxIncludedAmount.value
            }
            disabled={true}
          />
          <InputText
            slug="Total Price"
            title="Total Price"
            required={false}
            placeholder="Total Price"
            value={
              ((selected?.offering?.productOfferingObject
                ?.productOfferingPrice?.[0]?.price?.taxIncludedAmount?.value ||
                0) +
                (selected?.offering?.productOfferingObject
                  ?.productOfferingPrice?.[1]?.price?.taxIncludedAmount
                  ?.value || 0)) *
              (selected?.offering?.quantity || 1)
            }
            disabled={true}
          />
        </div>
        <div className="flex justify-center gap-4 w-1/2 pr-2">
          <InputText
            slug="None Recuring Changes Per Unit"
            title={`None Recuring Changes Per Unit (${selected?.offering?.productOfferingObject?.productOfferingPrice?.[1]?.price?.taxIncludedAmount?.unit})`}
            required={false}
            placeholder="None Recuring Changes Per Unit"
            value={
              selected?.offering?.productOfferingObject?.productOfferingPrice[1]
                .price.taxIncludedAmount.value
            }
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}
