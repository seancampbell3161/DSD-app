import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Parking from "./Parking";
import api from "../api/api";
import Placeholder from "/assets/images/placeholder.jpg";
import trashCan from "/assets/icons/bin.svg";
import swap from "/assets/icons/swap.svg";

import { SuccessfulStatusCodes } from "../global/SuccessfulStatusCodes";

// It describes the shape of the objects:
interface ParkingStatus {
  id: string;
  numberPlate: string;
  guestName: string;
  code: string;
  expireDate: string;
}

const Activeparkpass = () => {
  const [showLicensePlate, setShowLicensePlate] = useState(false);
  const [parkingPasses, setParkingPasses] = useState<ParkingStatus[]>([]);

  const doorId = 1003; // Initial Door value MUST be 3:
  const userId = 1001; // Initial Tenant value:

  // GET Parking Status
  useEffect(() => {
    const fetchParkingStatus = async () => {
      try {
        const res = await api.get(`users/${userId}/doors/${doorId}/parking-codes`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (SuccessfulStatusCodes.includes(res.status))  {
          const data = res.data;
          // Handles if data is an object or array
          if (Array.isArray(data)) {
            setParkingPasses(data);
          } else if (data) {
            setParkingPasses([data]);
          }
          console.log("Parking status:", data);
        } else {
          console.error("Failed to retrieve parking status");
        }
      } catch (error) {
        console.error("Error fetching parking status:", error);
      }
    };

    fetchParkingStatus();
  }, []);

  // POST Creates Parking Access Code
  const createParkingAccessCode = async ({
    guestName,
    numberPlate,
  }: {
    guestName: string;
    numberPlate: string;
  }) => {
    try {
      const res = await api.post(
        `users/${userId}/door/${doorId}/parking-codes`,
        {
          numberPlate,
          guestName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (SuccessfulStatusCodes.includes(res.status)) {
        const data = res.data;
        // Adds new parking pass using spread syntax
        setParkingPasses((prevPasses) => [...prevPasses, data]);
        toast.success("Parking code was created!");
        console.log(`Parking Code:`, data);
      } else {
        console.error("Failed to create parking code");
        toast.error("Only 4 passes allowed per tenant.");
      }
    } catch (error) {
      console.error("Error creating parking code:", error);
      toast.error("Only 4 passes allowed per tenant.");
    }
  };

  // Deletes Parking Access Code
  const deleteParkingCode = async (passId: string) => {
    // Finds the guestName in order to console log it
    const findGuestName = parkingPasses.find((guest) => guest.id === passId);
    try {
      const res = await api.delete(`/parking-codes/${passId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (SuccessfulStatusCodes.includes(res.status)) {
        console.log(
          `Parking access code for: ${findGuestName?.guestName} has been deleted`
        );
        // Discards the deleted pass from the array
        setParkingPasses((prevPasses) =>
          prevPasses.filter((pass) => pass.id !== passId)
        );
        toast.success("Parking code was deleted!");
      } else {
        console.error("Failed to delete parking access code");
        const errorData = res.data;
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("Error deleting parking access code:", error);
    }
  };

  // Toggles between guestName & numberPlate
  const toggleDisplay = () => {
    setShowLicensePlate((prev) => !prev);
  };

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      <div className="mx-auto max-w-4xl m-4 p-4">
        <div className="border rounded-xl shadow-md overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-accentBlue">
            Welcome Back: Laura Johnson
          </h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 bg-accentBlue">
            {/* Guest Parking Component */}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
                <div className="w-full mb-6">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Guest Parking
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
                    <p className="text-sm">Apartment: 1</p>
                  </h1>
                  <Parking createParkingCode={createParkingAccessCode} />
                </div>
              </div>
            </div>

            {/* Active Park Pass Component*/}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="flex flex-col items-center justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
                <div className="w-full mb-6">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Active Passes
                  </h2>
                  <hr className="border-[#D3C9B8] w-full mt-2" />
                </div>

                <div className="w-full h-48 overflow-y-auto no-scrollbar">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-beige">
                        <th
                          className="p-2 text-left font-body border-b border-beige cursor-pointer"
                          onClick={toggleDisplay}
                        >
                          <div className="flex items-left">
                            Name{" "}
                            <img src={swap} alt="Swap" className="h-3 mx-1" />{" "}
                            Plate
                          </div>
                        </th>
                        <th className="p-2 text-center font-body border-b border-beige">
                          Pass #
                        </th>
                        <th className="p-2 text-right font-body border-b border-beige">
                          Expiration
                        </th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {parkingPasses.length > 0 ? (
                        parkingPasses.map((pass) => (
                          <tr key={pass.id} className="border-b border-beige">
                            <td className="p-0 text-left border-r border-beige">
                              {showLicensePlate
                                ? pass.numberPlate
                                : pass.guestName}
                            </td>
                            <td className="p-2 text-left border-r border-beige">
                              {pass.code}
                            </td>
                            <td className="p-2 text-left">
                              {new Date(pass.expireDate).toLocaleString([], {
                                year: "2-digit",
                                month: "numeric",
                                day: "numeric",
                              })}
                            </td>
                            <td className="p-1">
                              <button
                                onClick={() => deleteParkingCode(pass.id)}
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
                              No active passes have been created
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center sm:hidden">
                  <Parking createParkingCode={createParkingAccessCode} />
                </div>
                <p className="mt-6 text-charcoal italic text-center">
                  Contact management if more than 4 guest passes are needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Activeparkpass;
