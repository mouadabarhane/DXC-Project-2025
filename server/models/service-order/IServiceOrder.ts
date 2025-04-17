type Note = {
  text?: string;
};

enum ReferredType {
  CUSTOMER = "Customer",
  CONTACT = "CustomerContact",
}

type RelatedParty = {
  id: string;
  name?: string;
  "@referredType": ReferredType;
  "@type": string;
};

enum Action {
  ADD = "add",
  CHANGE = "change",
  DELETE = "delete",
  DEFAULT = "",
}

enum RelationshipType {
  HASCHILD = "HasChild",
  HASPARENT = "HasParent",
  REQUIRES = "Requires",
}

type OrderRelationship = {
  id: string;
  relationshipType: RelationshipType;
};

type Place = {
  id: string;
  "@type": string;
};

type ServiceRelatedParty = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  "@referredType": string;
  "@type": string;
};

type ServiceCharacteristic = {
  name?: string;
  previousValue?: string;
  value?: string;
};

type ServiceRelationship = {
  id?: string;
  relationshipType?: string;
};

type ServiceSpecification = {
  id: string;
  internalVersion?: string;
  name?: string;
  version?: string;
  "@type": string;
};

type Service = {
  id?: string;
  serviceCharacteristic: ServiceCharacteristic[];
  serviceRelationship: ServiceRelationship[];
  serviceSpecification: ServiceSpecification;
  "@type": string;
};

type ServiceOrderItem = {
  action: Action;
  id: string;
  orderRelationship: OrderRelationship[];
  place?: Place;
  quantity?: number;
  relatedParty?: ServiceRelatedParty;
  service: Service;
  state: string;
  "@type": string;
};

export default interface IServiceOrderDocument {
  externalId?: string;
  note?: Note[];
  orderDate?: string;
  relatedParty?: RelatedParty[];
  requestedCompletionDate?: string;
  requestedStartDate?: string;
  serviceOrderItem?: ServiceOrderItem[];
  completionDate?: string;
  expectedCompletionDate?: string;
  status: string;
  ponr: boolean;
  "@type": string;
}
