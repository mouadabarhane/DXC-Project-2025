type TProductSpecCharacteristic = {
  name: string;
  valueType: string;
  productSpecCharacteristicValue: Array<{ value: string }>;
};

export type TSelectedProductSpec = {
  id: string;
  name: string;
  productSpecCharacteristic: Array<TProductSpecCharacteristic>;
};
