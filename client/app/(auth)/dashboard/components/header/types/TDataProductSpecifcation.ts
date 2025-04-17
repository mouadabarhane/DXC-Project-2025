export type TDataProductSpecification = {
  _id: string;
  productId: string;
  name: string;
  status: string;
  description: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
};
