import { useEffect, useState } from "react";
import { Modal } from "./modal/Modal";
import api from "../../api/api";
import Placeholder from "/assets/images/placeholder.jpg";
import swap from "/assets/icons/swap.svg";
import { Table } from "./table";

// Acceptance criteria for MVP

// The resident can select a complaint from a list of options (3-4 buttons)

// the button records : complaint type, time, date, location( room# ).

// Brief 200 character input w/ submit button

// The system escalates the issue to property management with a detailed report.

// include summary of complaints. (a table with buttons? download report cta)

interface Complaint {
  id: string;
  type: string;
  message: string;
  timeCreated: string;
  status: string;
}

export const Complaint = () => {
  const [isModal, setIsModal] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleModalClose = () => {
    setIsModal(false);
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get(`/complaints`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const data = res.data;
          if (Array.isArray(data)) {
            setComplaints(data);
          } else if (data) {
            setComplaints([data]);
          }

          console.log("New Complaint", data);
        } else {
          console.error("Failed to retrieve new complaints");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      <div className="mx-auto max-w-4xl m-4 p-4">
        <div className="border rounded-xl shadow-md overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-accentBlue">
            Welcome Back: Laura Johnson
          </h1>
          <div className="Complaint bg-accentBlue">
            <div className="complaint-desktop md:flex md:flex-row md:justify-between">
              {/* Desktop Layout */}
              <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
                <div className="hidden md:flex md:flex-col md:items-center md:justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
                  <div className="w-full mb-6">
                    <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                      Have a Complaint?
                    </h2>
                    <hr className="border-[#D3C9B8] w-full mt-2" />
                  </div>

                  <div className="flex justify-center">
                    <div className="relative flex justify-center items-center border rounded-full h-32 w-32 mb-8 shadow-sm">
                      <img
                        src={Placeholder}
                        alt="Placeholder"
                        className="w-32 h-32 border rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center flex-col items-center">
                    <h1 className="mb-4 text-center capitalize font-[Roboto Condensed] font-medium text-xl">
                      Laura Johnson
                      <p className="text-sm">Apt: 1</p>
                    </h1>

                    <div className="flex justify-center w-full">
                      <button
                        onClick={() => setIsModal(true)}
                        onTouchEnd={() => setIsModal(true)}
                        className="border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
                      >
                        File a Complaint
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
                <div className="flex flex-col items-center justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
                  <div className="w-full mb-6">
                    <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                      Complaint Report
                    </h2>
                    <hr className="border-[#D3C9B8] w-full mt-2" />
                  </div>

                  <div className="w-full h-48 overflow-y-auto no-scrollbar">
                    <Table
                      complaints={complaints}
                      setComplaints={setComplaints}
                    />
                  </div>

                  <div className="flex justify-center sm:hidden">
                    <button
                      onClick={() => setIsModal(true)}
                      onTouchEnd={() => setIsModal(true)}
                      className="border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize mt-4"
                    >
                      File a Complaint
                    </button>
                  </div>

                  <p className="mt-6 text-charcoal italic text-center">
                    Contact management if more assistance is needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModal}
        closeModal={handleModalClose}
        complaints={setComplaints}
      />
    </main>
  );
};
