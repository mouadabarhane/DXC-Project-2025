import React from "react";

interface IncidentDetailsModalProps {
  incident: any;
  closeModal: () => void;
}

const IncidentDetailsModal: React.FC<IncidentDetailsModalProps> = ({
  incident,
  closeModal,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Incident Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Caller:
              </label>
              <input
                type="text"
                value={incident.caller}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Incident Number:
              </label>
              <input
                type="text"
                value={incident.incidentNumber}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Short Description:
              </label>
              <input
                type="text"
                value={incident.shortDescription}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                value={incident.description}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Priority:
              </label>
              <input
                type="number"
                value={incident.priority}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category:
              </label>
              <input
                type="text"
                value={incident.category}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Assignment Group:
              </label>
              <input
                type="text"
                value={incident.assignmentGroup}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                readOnly
              />
            </div>
          </div>
          <button
            onClick={closeModal}
            className="appearance-none block w-full  bg-purple-700 hover:bg-purple-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default IncidentDetailsModal;
