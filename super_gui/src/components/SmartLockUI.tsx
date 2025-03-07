import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import User from "/assets/icons/bxs-user.svg";
import Lease from "/assets/icons/bxs-pen.svg";
import Lock from "/assets/icons/bx-lock-alt.svg";
import OpenLock from "/assets/icons/bx-lock-open-alt.svg";
import Placeholder from "/assets/images/placeholder.jpg";
import FrontDoorModal from "./FrontDoorModal";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);

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
          setLockStatus(data);
          console.log(`Door Status:`, data);
        } else {
          console.error("Failed to determine door status");
        }
      } catch (error) {
        console.error("Error determining door status:", error);
      }
    };
    fetchDoorStatus();
  }, []);

  // UPDATE Door Status
  const updateDoorStatus = async () => {
    if (lockStatus === null) return;
    const newStatus = lockStatus === "locked";
    try {
      const res = await fetch(
        `http://localhost:8080/doors/${doorId}/status?openTheDoor=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        setIsModalOpen(true);
      } else {
        console.error("Failed to update door status");
      }
    } catch (error) {
      console.error("Error updating door status:", error);
    }
  };

  // Handle modal confirmation (Yes/Cancel)
  const handleConfirmation = async (res: boolean) => {
    setIsModalOpen(false); // close modal regardless of response.

    if (res) {
      setHasConfirmed(true); // set to true to handle logic.

      try {
        const res = await fetch(
          `http://localhost:8080/doors/${doorId}/status?openTheDoor=${
            lockStatus === "locked" ? true : false
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setLockStatus(data);
          console.log(`Door Status:`, data);
        } else {
          console.error("Error updating door status");
        }
      } catch (error) {
        console.error("Error updating door status:", error);
      }
      // Resets to false after fetch is done.
      setHasConfirmed(false);
    }
  };

  return (
    <main className="min-h-screen  relative pb-16 md:pb-0 bg-[#D3C9B8]">
      {/* DESKTOP NAV BAR LAYOUT*/}
      <div className="container hidden max-w-4xl mx-auto border-2 md:block">
        <div className="flex justify-between p-2 border-t-2 border-b-2">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center w-auto gap-2">
              <Link
                to=""
                className="flex-shrink-0 p-2 transition duration-500 bg-gray-800 border rounded-full hover:bg-accentGreen focus:bg-accentGreen focus:ring-0 focus:ring-accentGreen focus:outline-none group"
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
        <div className="border rounded-xl shadow-md overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-accentBlue">
            Welcome Back: Laura Johnson
          </h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 bg-accentBlue">
            {/* DESKTOP FRONT DOOR LAYOUT */}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-center border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white ">
                <div className="relative w-full flex justify-center mt-2">
                  <h2 className="absolute bottom-5 text-xl text-center font-medium font-[Roboto Condensed]">
                    Front Door
                    <hr className="flex justify-start border-[#D3C9B8] w-80" />
                  </h2>
                </div>

                <div className="flex justify-center">
                  <div className="relative flex justify-center items-center border rounded-full h-32 w-32 mb-8 shadow-sm">
                    <img
                      src={Placeholder}
                      alt="Placeholder"
                      className="w-32 h-32 border rounded-full"
                    />
                    <div className="absolute top-18 left-23 flex justify-center items-center border border-[#EDEADE] rounded-full h-12 w-12 mb-8 shadow-sm bg-[#EDEADE]">
                      {lockStatus === "locked" ? (
                        <>
                          <img src={Lock} alt="Lock" className="w-10 h-10" />
                        </>
                      ) : (
                        <>
                          <img
                            src={OpenLock}
                            alt="Lock"
                            className="w-10 h-10"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {lockStatus === null ? (
                  <p className="italic">Loading door status...</p>
                ) : (
                  <>
                    <h1 className="mb-4 text-center capitalize font-[Roboto Condensed] font-medium text-xl">
                      Laura Johnson
                      <p className="text-sm">Room: 204</p>
                    </h1>
                    <div className="flex justify-center w-full">
                      <button
                        onClick={updateDoorStatus}
                        className="border rounded-full py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
                      >
                        {lockStatus === "locked" ? "unlocked" : "locked"} Front
                        Door
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
                  <h2 className="mb-2 text-lg font-bold sm:text-xl">
                    Front Door
                  </h2>
                  {lockStatus === null ? (
                    <p className="italic">Loading door status...</p>
                  ) : (
                    <>
                      <p className="mb-4 capitalize">Status: {lockStatus}</p>
                      <div className="flex justify-center w-full">
                        <button
                          onClick={updateDoorStatus}
                          className="border rounded-lg py-2 px-3 sm:px-4 w-1/2 font-medium active:bg-gray-100 transition capitalize"
                        >
                          {lockStatus === "locked" ? "unlocked" : "locked"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* DESKTOP GUEST LAYOUT */}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-center border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition">
                <div className="flex justify-center items-center border rounded-full h-32 w-32 mb-4 shadow-sm">
                  <img src={User} alt="User" className="w-20 h-20" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Guest</h2>

                <div className="flex justify-center w-full mb-3">
                  <div className="flex flex-col w-full max-w-md gap-2 px-3 py-2 mx-auto border rounded-lg shadow-sm">
                    <span className="p-1 px-3 overflow-hidden font-mono text-center border rounded-sm text-ellipsis whitespace-nowrap">
                      USad23@
                    </span>
                    <span className="text-sm text-center">Exp: 24hrs</span>
                  </div>
                </div>

                <div className="flex justify-center w-full max-w-xs">
                  <button className="w-1/2 px-4 py-2 font-medium transition border rounded-lg hover:bg-gray-50 active:bg-gray-100">
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
                  <h2 className="mb-2 text-lg font-bold sm:text-xl">Guest</h2>
                  <div className="flex justify-center mb-3">
                    <div className="flex flex-col w-full max-w-md gap-1 px-3 py-1 mx-auto border rounded-lg shadow-sm">
                      <span className="px-2 py-1 overflow-hidden font-mono text-sm text-center border rounded-sm text-ellipsis whitespace-nowrap">
                        USad23@
                      </span>
                      <span className="text-xs text-center sm:text-sm">
                        Exp: 24hrs
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <button className="w-1/2 px-3 py-2 font-medium transition border rounded-lg sm:px-4 active:bg-gray-100">
                      Cancel
                    </button>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
            <DigitalLease />
          </div>
  
        </div>
      </main>

      {/* MOBILE NAV BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t-2 p-2 shadow-lg">
        <div className="flex justify-around max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-auto gap-1"
            >
              <Link
                to=""
                className="flex-shrink-0 p-2 transition duration-500 bg-gray-800 border rounded-full hover:bg-accentGreen focus:bg-accentGreen focus:ring-0 focus:ring-accentGreen focus:outline-none group"
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
