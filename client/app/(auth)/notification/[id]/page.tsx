"use client";

import { useParams } from "next/navigation";
// eslint-disable-next-line import/no-named-as-default-member
import IncidentDetails from "../components/IncidentDetails";

export default function IncidentDetailsPage() {
  const { id } = useParams();
  return (
    <>
      <IncidentDetails incidentId={id} />
    </>
  );
}
