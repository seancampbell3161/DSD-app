import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import Lease from "/assets/icons/bxs-pen.svg";
import Lock from "/assets/icons/bx-lock-alt.svg";
import OpenLock from "/assets/icons/bx-lock-open-alt.svg";
import NoSignal from "/assets/icons/bx-no-signal.svg";
import Placeholder from "/assets/images/placeholder.jpg";
import FrontDoorModal from "./FrontDoorModal";
import GuestAccessModal from "./GuestAccessModal";

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
  const [guestCode, setGuestCode] = useState<string | null>("");
  const [displayGuestCode, setDisplayGuestCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>("");

  const doorId = 1; // Initial Door value:
  const userId = 1; // Initial Tenant value:

  // Gives prompt copy functionality
  const handleCopy = () => {
    setCopied(guestCode.code);
    navigator.clipboard.writeText(guestCode.code);
    setTimeout(() => setCopied(""), 3000);
  };

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

  // Creates Guest Access Code
  const handleGuestCode = async () => {
    setDisplayGuestCode(false);

    try {
      const res = await fetch(`http://localhost:8080/${userId}/door-codes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setGuestCode(data);
        console.log(`Guest Code:`, data);
      } else {
        console.error("Failed to update door status");
      }
    } catch (error) {
      console.error("Error updating door status:", error);
    }
  };

  // Deletes Guest Access Code
  const DeleteGuestCode = async () => {
    setDisplayGuestCode(false);

    try {
      const res = await fetch(`http://localhost:8080/${userId}/door-codes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: guestCode.id }),
      });
      if (res.ok) {
        console.log(`Guest Code deleted: ${guestCode.id}`);
        setGuestCode(null);
      } else {
        console.error("Failed to delete door code");
        const errorData = await res.json();
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("Error updating door status:", error);
    }
  };

  return (
    <main className="min-h-screen  relative pb-16 md:pb-0 bg-[#D3C9B8]">
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
        <div className="border rounded-xl shadow-md overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-accentBlue">
            Welcome Back: Laura Johnson
          </h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 bg-accentBlue">
            {/* DESKTOP FRONT DOOR LAYOUT */}
            <div className="p-4 md:p-6 md:w-1/2 flex justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
                <div className="w-full mb-6">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Front Door
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
                    <div className="absolute top-18 left-23 flex justify-center items-center border border-[#EDEADE] rounded-full h-12 w-12 mb-8 shadow-sm bg-[#EDEADE]">
                      {lockStatus === "locked" ? (
                        <img src={Lock} alt="Lock" className="w-10 h-10" />
                      ) : lockStatus === "unlocked" ? (
                        <img
                          src={OpenLock}
                          alt="Unlock"
                          className="w-10 h-10"
                        />
                      ) : (
                        <img
                          src={NoSignal}
                          alt="No signal"
                          className="w-10 h-10"
                        />
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
                        className="border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
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
                  <h2 className="text-lg sm:text-xl font-bold mb-2">
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

            {/* Modal Component */}
            <FrontDoorModal
              isOpen={isModalOpen}
              onConfirm={handleConfirmation}
              onCancel={handleConfirmation}
            />

            {/* <GuestAccessModal /> */}

            {/* DESKTOP GUEST LAYOUT */}
            <div className="p-4 md:p-6 md:w-1/2 flex-auto justify-center">
              <div className="hidden md:flex md:flex-col md:items-center md:justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
                <div className="w-full mb-8">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Guest Access
                  </h2>
                  <hr className="border-[#D3C9B8] w-full mt-2" />
                </div>

                <div className="flex justify-center w-full">
                  {!guestCode ? (
                    <button
                      onClick={handleGuestCode}
                      className="border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
                    >
                      Generate Access Code
                    </button>
                  ) : (
                    <div className="flex flex-col justify-center items-center w-full gap-3">
                      <div className="border rounded-sm w-24 text-white font-medium bg-[#FFD700] transition capitalize text-center -my-4">
                        <h1 className="text-[#413f3f] text-center flex items-center justify-center">
                          <span className="gap-24">
                            Exp:{" "}
                            <span>
                              {new Date(guestCode.expireDate).toLocaleString(
                                [],
                                {
                                  hour: "numeric",
                                  hour12: false,
                                }
                              )}
                            </span>
                            <span className="text-xs">hrs</span>
                          </span>
                        </h1>
                      </div>

                      <span className="flex justify-center border rounded-sm py-2 px-4 w-2xs text-white font-medium bg-[#0A2342] transition capitalize">
                        <h1 className="bg-[#413f3f] w-1/2 flex items-center justify-between rounded-sm text-center">
                          <span className="flex-1">{guestCode.code}</span>
                          <img
                            className="w-7 h-7 rounded-r-sm bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur cursor-pointer"
                            onClick={handleCopy}
                            src={
                              copied === guestCode.code
                                ? "/assets/icons/bx-check.svg"
                                : "/assets/icons/bx-copy.svg"
                            }
                          />
                        </h1>
                      </span>

                      <div className="flex justify-between scale-130 ">
                        <button
                          className="border rounded-sm px-6 w-1/2 text-white font-semibold bg-[#50C878] transition capitalize text-center text-lg hover:bg-[#45a65a]"
                          onClick={handleGuestCode}
                        >
                          Refresh
                        </button>
                        <button
                          className="border rounded-sm px-6 w-1/2 text-white font-semibold bg-[#D23715] transition capitalize text-center text-lg hover:bg-[#a92b12]"
                          onClick={DeleteGuestCode}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MOBILE GUEST LAYOUT */}
              <div className="flex flex-row md:hidden rounded-2xl border p-4 w-full shadow-sm">
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t-2 p-2 shadow-lg">
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
