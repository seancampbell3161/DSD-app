import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Package from "/assets/icons/bxs-package.svg";

const SmartLockUI = () => {
  const [packageStatus, setPackageStatus] = useState<boolean>(true);

  // Temporary until endpoints are created.
  const togglePackageStatus = () => {
    setPackageStatus((prev) => !prev);
    toast.success("Package retrieved by tenant.");
    console.log("Package retrieved by tenant.");
  };

  return (
    <section>
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
  );
};

export default SmartLockUI;
