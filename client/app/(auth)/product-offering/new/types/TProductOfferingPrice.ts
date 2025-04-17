type TPrice = {
  taxIncludedAmount: {
    unit: string;
    value: string;
  };
};

export type TProductOfferingPrice = {
  price: TPrice;
  priceType: string;
};
