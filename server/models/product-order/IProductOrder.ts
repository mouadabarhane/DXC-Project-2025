type Channel = {
  id: string;
  name?: string;
};

type Note = {
  text: string;
};

enum Action {
  ADD = "add",
  CHANGE = "change",
  DELETE = "delete",
  DEFAULT = "",
}

type TaxIncludedAmount = {
  unit?: string;
  value?: string;
};

type Price = {
  taxIncludedAmount?: TaxIncludedAmount;
};

type ItemPrice = {
  price?: Price;
  priceType?: string;
  recurringChargePeriod?: string;
};

type Place = {
  id: string;
  "@type": string;
};

type ProductCharacterisic = {
  name?: string;
  previousValue?: string;
  value?: string;
};

type ProductSpecification = {
  id: string;
  internalVersion?: string;
  name?: string;
  version?: string;
  "@type": string;
};

type ProductRelatedParty = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  "@referredType": string;
  "@type": string;
};

type Product = {
  id: string;
  place?: Place;
  productCharacteristic?: ProductCharacterisic[];
  productSpecification: ProductSpecification;
  relatedParty?: ProductRelatedParty[];
  "@type": string;
};

type ProductOffering = {
  id: string;
  internalVersion?: string;
  name?: string;
  version?: string;
};

enum RelationshipType {
  HASCHILD = "HasChild",
  HASPARENT = "HasParent",
}

type ProductOrderItemRelationship = {
  id: string;
  relationshipType: RelationshipType;
};

type ProductOrderItem = {
  action: Action;
  id: string;
  itemPrice?: ItemPrice[];
  product: Product;
  productOffering: ProductOffering;
  productOrderItemRelationship: ProductOrderItemRelationship[];
  quantity?: number;
  state: string;
  "@type": string;
};

enum ReferredType {
  CUSTOMER = "Customer",
  CONTACT = "CustomerContact",
}

type RelatedParty = {
  id?: string;
  name?: string;
  "@referredType": ReferredType;
  "@type": string;
};

type SoldProduct = {
  orderLineID: string;
  soldProductID: string;
};

export default interface IProductOrderDocument {
  orderNumber: string;
  channel: Channel[];
  externalId?: string;
  note?: Note[];
  orderCurrency: string;
  productOrderItem: ProductOrderItem[];
  relatedParty?: RelatedParty[];
  orderDate?: string;
  requestedCompletionDate?: string;
  requestedStartDate?: string;
  completionDate?: string;
  expectedCompletionDate?: string;
  ponr: boolean;
  state: string;
  createdBy: string;
  created: Date;
  soldProducts?: SoldProduct[];
  "@type": string;
}
