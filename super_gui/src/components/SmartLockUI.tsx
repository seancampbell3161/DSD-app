import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Package from "/assets/icons/bxs-package.svg";
import { SuccessfulStatusCodes } from "../global/SuccessfulStatusCodes";

import api from "../api/api";

const SmartLockUI = () => {
  const [packageStatus, setPackageStatus] = useState<number | null>(null);

  const userId = 1001;
  const lockerId = 1001; //1-5 available lockers

  // GET Packages Status
  useEffect(() => {
    const fetchPackageStatus = async () => {
      try {
        const res = await api.get(
          `/users/${userId}/lockers`,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (SuccessfulStatusCodes.includes(res.status)) {
          const data = res.data;
          setPackageStatus(data[1][0]);
          console.log(`Packages status:`, data);
        } else {
          console.error("Failed to fetch packages for pickup");
        }
      } catch (error) {
        console.error("Failed to fetch packages for pickup", error);
      }
    };

    fetchPackageStatus();
  }, []);

  // PATCH Packages Status
  const updatePackageStatus = async ({
    id,
    lockerNumber,
    apartmentNumber,
  }: {
    id: number;
    lockerNumber: number;
    apartmentNumber: number;
  }) => {
    try {
      const res = await api.patch(`/locker/${lockerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id,
          lockerNumber,
          apartmentNumber: null,
        },
      });

      if (SuccessfulStatusCodes.includes(res.status)) {
        const data = res.data;
        setPackageStatus(null);
        toast.success("Package retrieved by tenant.");
        console.log("Package retrieved by tenant.", data);
      }
    } catch (error) {
      console.error("Error updating packages status:", error);
    }
  };

  return (
    <section>
      {/* SMART LOCKER TENANT DESKTOP LAYOUT */}
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
            <p className="text-base">Locker: {packageStatus.lockerNumber}</p>
          </h1>

          <div className="flex justify-center w-full">
            <button
              onClick={() =>
                updatePackageStatus({
                  id: packageStatus.id,
                  lockerNumber: packageStatus.lockerNumber,
                  apartmentNumber: packageStatus.apartmentNumber,
                })
              }
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
        <div className="hidden md:flex md:flex-col md:items-center md:justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white my-4">
          <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
            No Packages Available
          </h2>
        </div>
      )}

      {/* SMART LOCKER TENANT MOBILE LAYOUT */}
      <div className="md:hidden sm:flex sm:flex-col sm:justify-center border rounded-2xl p-6 w-full shadow-sm hover:shadow transition bg-white my-4">
        <div className="w-full mb-5">
          <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
            Smart Locker
          </h2>
          <hr className="border-[#D3C9B8] w-full mt-2" />
        </div>

        {packageStatus ? (
          <>
            <h1 className="text-center capitalize font-[Roboto Condensed] font-medium text-base">
              Package Received
              <p className="text-base">Locker: {packageStatus.lockerNumber}</p>
            </h1>

            <div className="flex justify-center w-full">
              <button
                onClick={() =>
                  updatePackageStatus({
                    id: packageStatus.id,
                    lockerNumber: packageStatus.lockerNumber,
                    apartmentNumber: packageStatus.apartmentNumber,
                  })
                }
                className="relative border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
              >
                <span className="text-center w-full">Pickup Package</span>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex justify-center items-center border border-[#EDEADE] rounded-full h-9 w-9 bg-[#EDEADE]">
                  <img src={Package} alt="Lock" className="w-10 h-10" />
                </div>
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-center capitalize font-[Roboto Condensed] font-medium text-base">
            No Packages Available
          </h1>
        )}
      </div>
    </section>
  );
};

export default SmartLockUI;
