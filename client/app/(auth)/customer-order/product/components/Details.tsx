import React, { useState } from "react";
import dataProductOrders from "../data/dataProductOrders";

export default function Details() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOrderClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setModalIsOpen(true);
  };
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  return (
    <div className="customer-order">
      {dataProductOrders.map((order) => {
        if (order.id === selectedOrderId) {
          return (
            <div key={order.id}>
              <p>Number: {order.Number}</p>
              <p>State: {order.state}</p>
              <p>Task Type: {order.TaskType}</p>
              <p>Priority: {order.Priority}</p>
              <p>Assigned to: {order.AssignedTo}</p>
              <p>Created: {order.Created.toISOString()}</p>
              <p>Short description: {order.Shortdescription}</p>
              {/* Ajoutez d'autres propriétés de l'objet order ici */}
            </div>
          );
        }
        return null;
      })}
      {selectedOrderId && (
        <div>
          <h2>Order Details</h2>
          <p>ID: {selectedOrderId}</p>
          {dataProductOrders.map((order) => {
            if (order.id === selectedOrderId) {
              return (
                <div key={order.id}>
                  <p>Number: {order.Number}</p>
                  <p>State: {order.state}</p>

                  {/* Ajoutez d'autres propriétés de l'objet order ici */}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
