import { useState } from "react";
import swap from "/assets/icons/swap.svg";
import trashCan from "/assets/icons/bin.svg";
import api from "../../api/api";
import { toast } from "react-toastify";

interface Complaint {
  type: string;
  id: string;
  message: string;
  timeCreated: string;
  status: string;
  complaintType: string;
  user: {username: string}
}

interface TableProps {
  complaints: Complaint[];
}

export const Table = ({ complaints }: TableProps) => {
  const [showComplaintType, setShowComplaintType] = useState(false);

  const toggleDisplay = () => {
    setShowComplaintType((prev) => !prev);
  };

  const handleDeleteComplaint = async (id: string) => {
    try {
      await api.delete(`/complaints/${id}`);

      complaints((prev) => {
        prev.filter((complaint) => complaint.id !== id);
      });

      toast.success("Complaint deleted successfully");
    } catch {
      toast.error("Failed to delete complaint");
    }
  };

  return (
    <table className="w-full">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-beige">
          <th
            className="p-2 text-left font-body border-b border-beige cursor-pointer"
            onClick={toggleDisplay}
          >
            <div className="flex items-left">
              Tenant <img src={swap} alt="Swap" className="h-3 mx-1" /> Type
            </div>
          </th>
          <th className="p-2 text-center font-body border-b border-beige">
            Complaint
          </th>
          <th className="p-2 text-right font-body border-b border-beige">
            Date
          </th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <tr key={complaint.id} className="border-b border-beige">
              <td className="p-0 text-left border-r border-beige">
                {showComplaintType
                  ? complaint.complaintType
                  : complaint.user.username}
              </td>
              <td className="p-2 text-left border-r border-beige">
                {complaint.message}
              </td>
              <td className="p-2 text-right border-r border-beige">
                <>
                  {new Date(complaint.timeCreated).toLocaleString([], {
                    year: "2-digit",
                    month: "numeric",
                    day: "numeric",
                  })}
                </>
              </td>
              <td className="p-1">
                <button
                  onClick={() => handleDeleteComplaint(complaint.id)}
                  className="flex justify-end"
                >
                  <img src={trashCan} alt="Bin" className="h-8" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="p-2 text-center">
              <p className="mt-6 italic text-charcoal font-body">
                No active complaints have been created
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
