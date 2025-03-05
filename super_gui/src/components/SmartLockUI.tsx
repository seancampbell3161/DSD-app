import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import User from "/assets/icons/bxs-user.svg";
import Lease from "/assets/icons/bxs-pen.svg";
import Lock from "/assets/icons/bx-lock-alt.svg";

// Navigation Icons:
const menuItems = [
  { Icon: FrontDoor, alt: "FrontDoor" },
  { Icon: Parking, alt: "Parking" },
  { Icon: Complaints, alt: "Complaints" },
  { Icon: Lease, alt: "Lease" },
  { Icon: SmartLocker, alt: "SmartLocker" },
];

const SmartLockUI = () => {
  const [lockStatus, setLockStatus] = useState<string | null>(null);
  const doorId = 1; // Initial Door value:

  // GET Door status
  useEffect(() => {
    const fetchDoorStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/doors/${doorId}/status`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setLockStatus(data.status);
        } else {
          console.error("Failed to determine door status");
        }
      } catch (error) {
        console.error("Error determining door status:", error);
      }
    };
    fetchDoorStatus();
  }, [doorId]); // Only run when doorId changes

  // UPDATE Door Status
  const updateDoorStatus = async () => {
    if (lockStatus === null) return;
    const newStatus = lockStatus === "Locked" ? "Unlocked" : "Locked";
    try {
      const res = await fetch(`http://localhost:8080/doors/${doorId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLockStatus(newStatus);
      } else {
        console.error("Failed to update door status");
      }
    } catch (error) {
      console.error("Error updating door status:", error);
    }
  };
  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      {/* DESKTOP NAV BAR LAYOUT*/}
      <div className="hidden md:block container mx-auto border-2 max-w-4xl">
        <div className="border-b-2 border-t-2 p-2 flex justify-between">
          {menuItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-center w-auto">
              <Link
                to=""
                className="border rounded-full p-2 flex-shrink-0 bg-gray-800 hover:bg-accentGreen focus:bg-accentGreen focus:ring-0 focus:ring-accentGreen focus:outline-none transition duration-500 group"
              >
                <img src={item.Icon} alt={item.alt} className="w-6 h-6" />
              </Link>
              <p className="text-base font-medium">{item.alt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-4xl m-4 p-4">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Welcome Back: Rudy Moto!
        </h1>
        <div className="border rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0">
            {/* DESKTOP FRONT DOOR LAYOUT */}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-center border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition">
                <div className="flex justify-center items-center border rounded-full h-32 w-32 mb-8 shadow-sm">
                  <img src={Lock} alt="Lock" className="w-20 h-20" />
                </div>
                <h2 className="text-xl font-bold mb-2">Front Door</h2>
                {lockStatus === null ? (
                  <p className="italic">Loading door status...</p>
                ) : (
                  <>
                    <p className="mb-6 text-center">Status: {lockStatus}</p>
                    <div className="flex justify-center w-full max-w-xs">
                      <button
                        onClick={updateDoorStatus}
                        className="border rounded-lg py-2 px-4 w-1/2 font-medium hover:bg-gray-50 active:bg-gray-100 transition"
                      >
                        {lockStatus === "Locked" ? "Unlocked" : "Locked"}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* MOBILE FRONT DOOR LAYOUT */}
              <div className="flex flex-row md:hidden rounded-2xl border p-4 w-full shadow-sm">
                <div className="flex justify-center items-center border rounded-full h-24 w-24 sm:h-28 sm:w-28 mr-4 shadow-sm">
                  <img
                    src={Lock}
                    alt="Lock"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 text-center">
                  <h2 className="text-lg sm:text-xl font-bold mb-2">
                    Front Door
                  </h2>
                  <p className="mb-4">Status: Locked</p>
                  <div className="flex justify-center w-full">
                    <button className="border rounded-lg py-2 px-3 sm:px-4 w-1/2 font-medium active:bg-gray-100 transition">
                      Unlock
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP GUEST LAYOUT */}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-center border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition">
                <div className="flex justify-center items-center border rounded-full h-32 w-32 mb-4 shadow-sm">
                  <img src={User} alt="User" className="w-20 h-20" />
                </div>
                <h2 className="text-xl font-bold mb-2">Guest</h2>

                <div className="flex justify-center mb-3 w-full">
                  <div className="flex flex-col border rounded-lg px-3 py-2 gap-2 w-full max-w-md mx-auto shadow-sm">
                    <span className="border rounded-sm px-3 p-1 overflow-hidden text-ellipsis whitespace-nowrap text-center font-mono">
                      USad23@
                    </span>
                    <span className="text-center text-sm">Exp: 24hrs</span>
                  </div>
                </div>

                <div className="flex justify-center w-full max-w-xs">
                  <button className="border rounded-lg py-2 px-4 w-1/2 font-medium hover:bg-gray-50 active:bg-gray-100 transition">
                    Cancel
                  </button>
                </div>
              </div>

              {/* MOBILE GUEST LAYOUT */}
              <div className="flex flex-row md:hidden rounded-2xl border p-4 w-full shadow-sm">
                <div className="flex justify-center items-center border rounded-full h-24 w-24 sm:h-28 sm:w-28 mr-4 shadow-sm">
                  <img
                    src={User}
                    alt="User"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 text-center">
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Guest</h2>
                  <div className="flex justify-center mb-3">
                    <div className="flex flex-col border rounded-lg px-3 py-1 gap-1 w-full max-w-md mx-auto shadow-sm">
                      <span className="border rounded-sm px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap text-center font-mono text-sm">
                        USad23@
                      </span>
                      <span className="text-center text-xs sm:text-sm">
                        Exp: 24hrs
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <button className="border rounded-lg py-2 px-3 sm:px-4 w-1/2 font-medium active:bg-gray-100 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE NAV BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t-2 p-2 bg-white shadow-lg">
        <div className="flex justify-around max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 items-center w-auto"
            >
              <Link
                to=""
                className="border rounded-full p-2 flex-shrink-0 bg-gray-800 hover:bg-accentGreen focus:bg-accentGreen focus:ring-0 focus:ring-accentGreen focus:outline-none transition duration-500 group"
              >
                <img src={item.Icon} alt={item.alt} className="w-5 h-5" />
              </Link>
              <span className="text-xs">{item.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SmartLockUI;
