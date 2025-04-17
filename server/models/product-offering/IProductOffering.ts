type Category = {
  id: string;
  name?: string;
};

type Channel = {
  description?: string;
  id: string;
  name?: string;
};

type ProductCharacteristic = {
  name?: string;
  value?: string;
};

type TaxIncludedAmount = {
  unit?: string;
  value?: string;
};

type Price = {
  taxIncludedAmount: TaxIncludedAmount;
};

type ProductOfferingPrice = {
  price?: Price;
  priceType?: string;
};

type ProductSpecification = {
  id: string;
  name?: string;
  internalId?: string;
  internalVersion?: string;
  version?: string;
};

type ProductSpecCharacteristicValue = {
  value: string;
};

type ValidFor = {
  endDateTime?: string;
  startDateTime?: string;
};

type ProdSpecCharValueUse = {
  productSpecCharacteristicValue: ProductSpecCharacteristicValue[];
  description?: string;
  name: string;
  validFor?: ValidFor;
  valueType?: string;
};
export default interface IProductOfferingDocument {
  _id: string;
  number: string;
  category: Category[];
  channel: Channel[];
  description: string;
  externalId?: string;
  id: string;
  internalId: string;
  internalVersion?: string;
  lastUpdate?: string;
  name: string;
  productCharacteristic: ProductCharacteristic[];
  productOfferingPrice: ProductOfferingPrice[];
  productOfferingTerm?: string;
  productSpecification: ProductSpecification;
  prodSpecCharValueUse?: ProdSpecCharValueUse[];
  validFor: ValidFor;
  version?: string;
  status?: string;
  createdBy: String;
  created: Date;
}
