"use client";

import React, { useState, useEffect } from "react";
import * as dotenv from "dotenv";
import { FaEye, FaTrashAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import IncidentDetailsModal from "./IncidentDetailsModal";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

interface Incident {
  _id: string; // Replace with the actual type of `_id`
  // Define other properties of the Incident object
  // assignmentGroup: string | number | readonly string[] | undefined;
  // shortDescription: string | number | readonly string[] | undefined;
  // priority: string | number | readonly string[] | undefined;
  // ...
}
const IncidentTable = () => {
  const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsPerPage] = useState(4);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/incidents`);
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };
  const handleDelete = async (incidentId: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?",
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${AXIOS_URL}/api/incidents/${incidentId}`,
        );

        if (response.status === 200) {
          setIncidents((prevIncidents) =>
            prevIncidents.filter(
              (incident: Incident) => incident._id !== incidentId,
            ),
          );
          console.log(
            `Incident with ID ${incidentId} deleted successfully from MongoDB.`,
          );
        } else {
          console.error(
            `Failed to delete incident with ID ${incidentId} from MongoDB.`,
          );
        }
      } catch (error) {
        console.error("Error deleting incident:", error);
      }
    }
  };

  const handleViewDetails = (incident: React.SetStateAction<null>) => {
    setSelectedIncident(incident);
  };

  const handleCloseModal = () => {
    setSelectedIncident(null);
  };

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  // Anass: notification page wasn't opening fixed
  const filteredIncidents = incidents.filter(
    (incident: any) =>
      incident.incidentNumber &&
      incident.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = filteredIncidents.slice(
    indexOfFirstIncident,
    indexOfLastIncident,
  );

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6">
        <Header />
        <div className="flex w-full">
          <div className="w-full">
            <div className="ml-2 flex mt-2">
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      Recent Incidents
                    </h2>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <div className="flex justify-end mb-4">
                        <div className="w-1/3 flex items-center">
                          <div className="pl-20">
                            <FaSearch size={20} className="text-gray-700" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search number"
                            className="mx-2 px-6 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                            value={searchTerm}
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Incident Number
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Caller
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Short Description
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              State
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Priority
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Assignment Group
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              CreateDate
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              UpdateDate
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredIncidents
                            .slice(indexOfFirstIncident, indexOfLastIncident)
                            .map((incident: any, index) => (
                              <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.incidentNumber}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.caller}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.shortDescription}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                                    <span
                                      aria-hidden
                                      className={`absolute inset-0 ${
                                        incident.state === "New"
                                          ? "bg-green-200"
                                          : incident.state === "On Hold"
                                          ? "bg-yellow-200"
                                          : incident.state === "In Progress"
                                          ? "bg-blue-200"
                                          : incident.state === "Canceled"
                                          ? "bg-red-200"
                                          : incident.state === "Resolved"
                                          ? "bg-purple-200"
                                          : incident.state === "Closed"
                                          ? "bg-gray-200"
                                          : ""
                                      } rounded-full`}
                                    ></span>

                                    <span className="relative">
                                      {incident.state}
                                    </span>
                                  </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.description}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.priority}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.category}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {incident.assignmentGroup}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {new Date(
                                      incident.createDate,
                                    ).toLocaleString("en-US", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {new Date(
                                      incident.updateDate,
                                    ).toLocaleString("en-US", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div
                                      onClick={() =>
                                        handleViewDetails(incident)
                                      }
                                      className="mr-3 cursor-pointer"
                                    >
                                      <FaEye className="text-purple-800 hover:text-purple-500" />
                                    </div>
                                    <div
                                      onClick={() => handleDelete(incident._id)}
                                      className="cursor-pointer"
                                    >
                                      <FaTrashAlt className="text-purple-800 hover:text-purple-500" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {indexOfFirstIncident + 1} to{" "}
                {Math.min(indexOfLastIncident, filteredIncidents.length)} of{" "}
                {filteredIncidents.length} Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-l"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastIncident >= filteredIncidents.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {/* ... */}
          <div>
            {selectedIncident && (
              <IncidentDetailsModal
                incident={selectedIncident}
                closeModal={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentTable;
