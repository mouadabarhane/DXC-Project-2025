import React, { useEffect, useState } from "react";
import * as dotenv from "dotenv";
import axios from "axios";
import "../style/style.css";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

dotenv.config();
const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface Incident {
  assignmentGroup: string | number | readonly string[] | undefined;
  shortDescription: string | number | readonly string[] | undefined;
  priority: string | number | readonly string[] | undefined;
  incidentNumber: string;
  caller: string;
  description: string;
  category: string;
  // Add more properties if needed
}

const IncidentDetails = ({ incidentId }: { incidentId: string }) => {
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(
          `${AXIOS_URL}/api/incidents/${incidentId}`,
        );
        setIncident(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncident();
  }, []);

  // if (!incident) {
  //   return <p>Loading incident details...</p>;
  // }

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6">
        <Header />
        <div className="flex w-5/6 mx-auto py-10">
          <div className="ml-2 flex mt-2">
            <div>
              <form>
                <div className="flex flex-wrap -mx-3 mb-6 mr-2 ml-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Caller:
                    </label>
                    <input
                      type="text"
                      value={incident?.caller}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Incident Number:
                    </label>
                    <input
                      type="text"
                      value={incident?.incidentNumber}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Short Description:
                    </label>
                    <input
                      type="text"
                      value={incident?.shortDescription}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Description:
                    </label>
                    <textarea
                      value={incident?.description}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    ></textarea>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Priority:
                    </label>
                    <input
                      type="number"
                      value={incident?.priority}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Category:
                    </label>
                    <input
                      type="text"
                      value={incident?.category}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Assignment Group:
                    </label>
                    <input
                      type="text"
                      value={incident?.assignmentGroup}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
