import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Lock from "/assets/icons/bx-lock-alt.svg";
import OpenLock from "/assets/icons/bx-lock-open-alt.svg";
import NoSignal from "/assets/icons/bx-no-signal.svg";
import Placeholder from "/assets/images/placeholder.jpg";
import Package from "/assets/icons/bxs-package.svg";
import FrontDoorModal from "./FrontDoorModal";

const FrontDoorUI = () => {
  const [lockStatus, setLockStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [guestCode, setGuestCode] = useState<string | null>("");
  const [displayGuestCode, setDisplayGuestCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>("");
  const [packageStatus, setPackageStatus] = useState<boolean>(true);

  // Temporary until endpoints are created.
  const togglePackageStatus = () => {
    setPackageStatus((prev) => !prev);
    toast.success("Package retrieved by tenant.");
    console.log("Package retrieved by tenant.");
  };

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
      const res = await fetch(
        `http://localhost:8080/users/${userId}/door/${doorId}/door-codes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      const res = await fetch(
        `http://localhost:8080/users/${userId}/door/${doorId}/door-codes`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: guestCode.id,
          }),
        }
      );
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
    <main className="min-h-screen relative pb-16 md:pb-0">
      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-4xl m-4 p-4">
        <div className="border rounded-xl shadow-md overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-accentBlue">
            Welcome Back: Laura Johnson
          </h1>
          <div className="flex flex-col md:flex-row bg-accentBlue">
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
              <div className="md:hidden sm:flex sm:flex-col sm:justify-center border rounded-2xl p-6 w-full shadow-sm hover:shadow transition bg-white -mb-4">
                <div className="w-full mb-6">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Front Door
                  </h2>
                  <hr className="border-[#D3C9B8] w-full mt-2" />
                </div>

                {lockStatus === null ? (
                  <p className="italic text-center">Loading door status...</p>
                ) : (
                  <>
                    <div className="flex justify-center w-full">
                      <button
                        onClick={updateDoorStatus}
                        className="relative border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
                      >
                        <span className="text-center w-full">
                          {lockStatus === "locked" ? "unlocked" : "locked"}{" "}
                          Front Door
                        </span>

                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex justify-center items-center border border-[#EDEADE] rounded-full h-9 w-9 bg-[#EDEADE]">
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
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Component */}
            <FrontDoorModal
              isOpen={isModalOpen}
              onConfirm={handleConfirmation}
              onCancel={handleConfirmation}
            />

            {/* GUEST ACCESS NO CARS */}
            <section className="p-4 md:p-6 md:w-1/2 flex-auto justify-center">
              {/* DESKTOP GUEST LAYOUT */}
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
                                  year: "2-digit",
                                  month: "numeric",
                                  day: "numeric",
                                }
                              )}
                            </span>
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
              <div className="md:hidden sm:flex sm:flex-col sm:justify-center border rounded-2xl p-6 w-full shadow-sm hover:shadow transition bg-white">
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
                                  year: "2-digit",
                                  month: "numeric",
                                  day: "numeric",
                                }
                              )}
                            </span>
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
              {/* SMART LOCKER TENANT POV */}
              {/* DESKTOP LAYOUT */}

              {packageStatus ? (
                <div className="hidden md:flex md:flex-col md:items-center md:justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white my-4">
                  <div className="w-full mb-5">
                    <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                      Smart Locker
                    </h2>
                    <hr className="border-[#D3C9B8] w-full mt-2" />
                  </div>

                  <h1 className="text-center capitalize font-[Roboto Condensed] font-medium text-base">
                    Package Received
                    <p className="text-base">Locker: A21.</p>
                  </h1>

                  <div className="flex justify-center w-full">
                    <button
                      onClick={togglePackageStatus}
                      className="relative border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
                    >
                      <span className="text-center w-full">Pickup Package</span>

                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex justify-center items-center border border-[#EDEADE] rounded-full h-9 w-9 bg-[#EDEADE]">
                        <img src={Package} alt="Lock" className="w-10 h-10" />
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                !packageStatus
              )}

              {/* MOBILE LAYOUT */}
              {packageStatus ? (
                <div className="md:hidden sm:flex sm:flex-col sm:justify-center border rounded-2xl p-6 w-full shadow-sm hover:shadow transition bg-white my-4">
                  <div className="w-full mb-5">
                    <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                      Smart Locker
                    </h2>
                    <hr className="border-[#D3C9B8] w-full mt-2" />
                  </div>

                  <h1 className="text-center capitalize font-[Roboto Condensed] font-medium text-base">
                    Package Received
                    <p className="text-base">Locker: A21.</p>
                  </h1>

                  <div className="flex justify-center w-full">
                    <button
                      onClick={togglePackageStatus}
                      className="relative border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
                    >
                      <span className="text-center w-full">Pickup Package</span>

                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex justify-center items-center border border-[#EDEADE] rounded-full h-9 w-9 bg-[#EDEADE]">
                        <img src={Package} alt="Lock" className="w-10 h-10" />
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                !packageStatus
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FrontDoorUI;
