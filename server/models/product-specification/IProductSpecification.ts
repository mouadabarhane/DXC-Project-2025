type ProductSpecCharacteristicValue = {
  value: string;
};

type ValidFor = {
  endDateTime?: string;
  startDateTime?: string;
};

type ProductSpecCharacteristic = {
  description?: string;
  name: string;
  productSpecCharacteristicValue: ProductSpecCharacteristicValue[];
  validFor?: ValidFor;
  valueType?: string;
};

enum RelationshipType {
  COMPOSED_OF = "composed_of",
  BUNDLES = "bundles",
}

type ProductSpecificationRelationship = {
  id?: string;
  type: RelationshipType;
  validFor?: ValidFor;
};

type ResourceSpecification = {
  id: string;
  internalId?: string;
  internalVersion?: string;
  name?: string;
  version?: string;
};

type ServiceSpecification = {
  id?: string;
  internalId?: string;
  internalVersion?: string;
  name?: string;
  version?: string;
};
export default interface IProductSpecificationDocument {
  description: string;
  externalId?: string;
  id: string;
  internalId?: string;
  internalVersion?: string;
  lastUpdate?: string;
  name: string;
  productSpecCharacteristic?: ProductSpecCharacteristic[];
  productSpecificationRelationship?: ProductSpecificationRelationship[];
  resourceSpecification: ResourceSpecification[];
  serviceSpecification?: ServiceSpecification[];
  validFor: ValidFor;
  version?: string;
  status: string;
}
