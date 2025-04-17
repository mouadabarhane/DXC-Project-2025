import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const Tracking = () => {
  // Code de suivi ou intégration avec des outils de suivi ou d'analyse

  return (
    <div>
      <div style={{ alignItems: "center" }}>
        <div>
          {/* Icône de validation (vert) */}
          <FaCheck color="green" size={24} />

          {/* Icône de rejet ou d'annulation (rouge) */}
          <FaTimes color="red" size={24} />

          {/* Icône de progression avec une flèche vers la droite (bleu) */}
          <FaArrowRight color="blue" size={24} />
        </div>

        <p>Waiting for Approval (Approved): if state is new</p>

        <p>Order rejected (Rejected) : if state rejected</p>
        <p>Order In Progress (In Progress) : if state !new</p>
        <p>
          Fulfillment (In Progress) : if at least one of OLI state is completed
        </p>
        <p>Customer Order (Completed) ; if state is completed</p>
        <p>
          Cancellation request (Assessing cancellation) if state
          assessing_cancellation cancellation_received canceled
        </p>
        <p>
          Cancellation approved (Cancellation in progress) if state
          cancellation_received || canceled
        </p>
        <p>Customer Order (Cancelled) : if state is canceled </p>
      </div>
    </div>
  );
};

export default Tracking;
