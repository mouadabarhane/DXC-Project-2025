const convertProductOrderItem = (item: any) => {
  return {
    id: item.id,
    locationId: item.product.place.id,
    productSpecification: item.product.productSpecification,
    productOffering: item.productOffering,
  };
};

const readCreateOrderResponse = (response: any) => {
  const tmp = response.productOrderItem.map(convertProductOrderItem);
  console.log("readCreateOrderResponse tmp", tmp);
  const orderDetails = {
    id: response.id,
    state: response.state,
    href: response.href,
    orderDate: response.orderDate,
  };
  console.log("readCreateOrderResponse orderDetails", orderDetails);

  return {
    orderDetails,
    items: tmp,
  };
};

export default readCreateOrderResponse;
