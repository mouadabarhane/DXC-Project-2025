import React, { useState } from "react";

const UpdateProductForm = ({
  product,
  onClose,
}: {
  product: any;
  onClose: any;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [externalId, setExternalId] = useState(product.externalId);
  // const [orderDate, setOrderDate] = useState(product.orderDate);
  const [requestedCompletionDate, setRequestedCompletionDate] = useState(
    product.requestedCompletionDate,
  );
  const [requestedStartDate, setRequestedStartDate] = useState(
    product.requestedStartDate,
  );
  const [completionDate, setCompletionDate] = useState(product.completionDate);
  const [state, setState] = useState(product.state);
  const [ponr, setPonr] = useState(product.ponr);
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(
    product.expectedCompletionDate,
  );
  const updateProductOrder = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  console.log("Requested Completion Date:", requestedCompletionDate);
  return (
    <form
      className="grid lg:grid-cols-2 w-full gap-4"
      onSubmit={(e) => updateProductOrder(e)}
    >
      <div className="input-type">
        <input
          readOnly
          type="text"
          name="externalId"
          value={externalId}
          onChange={(e) => setExternalId(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="External ID"
          disabled
        />
      </div>

      <div className="input-type">
        <input
          type="text"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="State"
        />
      </div>

      <div className="input-type">
        <input
          type="text"
          name="requestedCompletionDate"
          value={requestedCompletionDate}
          onChange={(e) => setRequestedCompletionDate(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Requested Completion Date"
        />
      </div>

      <div className="input-type">
        <input
          type="text"
          name="requestedStartDate"
          value={requestedStartDate}
          onChange={(e) => setRequestedStartDate(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Requested Start Date"
        />
      </div>

      <div className="input-type">
        <input
          type="text"
          name="completionDate"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Completion Date"
        />
      </div>

      <div className="input-type">
        <input
          type="text"
          name="expectedCompletionDate"
          value={expectedCompletionDate}
          onChange={(e) => setExpectedCompletionDate(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Expected Completion Date"
        />
      </div>

      <div className="input-type">
        <select
          name="ponr"
          value={product.ponr}
          onChange={(e) => setPonr(e.target.value)}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        >
          <option value="">PONR</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-1/6 bg-purple-800 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-500 hover:text-green-500"
      >
        Update
      </button>
      <button
        className="flex justify-center text-md w-1/6 bg-gray-300 text-black px-4 py-2 border rounded-md hover:bg-gray-100 hover:border-gray-500 hover:text-black-500"
        onClick={onClose}
      >
        Cancel
      </button>
    </form>
  );
};

export default UpdateProductForm;
