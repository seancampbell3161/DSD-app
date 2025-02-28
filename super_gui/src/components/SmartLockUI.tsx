import { Link } from "react-router-dom";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import Key from "/assets/icons/bxs-key.svg";
import Car from "/assets/icons/bxs-car.svg";
import User from "/assets/icons/bx-user-circle.svg";
import Lease from "/assets/icons/bxs-pen.svg";

const SmartLockUI = () => {
  const menuItems = [
    { Icon: FrontDoor, alt: "FrontDoor" },
    { Icon: Parking, alt: "Parking" },
    { Icon: Complaints, alt: "Complaints" },
    { Icon: Lease, alt: "Lease" },
    { Icon: SmartLocker, alt: "SmartLocker" },
  ];

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      {/* DESKTOP NAV BAR*/}
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
              <p className="text-base">{item.alt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto border-2 max-w-4xl">
        {/* LOCK ACCESS */}
        <div className="mx-auto m-2 p-2">
          <h2 className="text-xl font-bold mb-2">Hello Moto,</h2>
          <div className="flex flex-col items-center border rounded-sm p-3 md:p-4">
            <h2 className="text-lg md:text-xl mb-1">Front Door</h2>
            <h2 className="mb-3">Status: Locked</h2>

            <div className="flex justify-between w-full max-w-xs">
              <button className="flex justify-center items-center border rounded-sm rounded-r-none p-2 w-1/2">
                Lock
              </button>
              <button className="flex justify-center items-center border rounded-sm rounded-l-none p-2 w-1/2">
                Unlock
              </button>
            </div>
          </div>
        </div>

        {/* GUEST ACCESS */}
        <div className="flex flex-col gap-4 py-4 px-2">
          <div className="flex justify-center">
            <img src={User} alt="Smart Locker" className="w-10 h-auto" />
          </div>

          <h3 className="text-center font-bold text-xl">Guest Access</h3>

          <div className="flex flex-col items-center gap-4">
            <button className="flex justify-center items-center gap-2 border rounded-sm w-full max-w-xs p-3">
              <img src={Key} alt="Key" className="w-5 h-5 " />
              Tap for Lock #
            </button>

            <button className="flex justify-center items-center gap-2 border rounded-sm w-full max-w-xs p-3">
              <img src={Car} alt="Car" className="w-5 h-5" />
              Tap for Parking #
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV BAR */}
      <div className="md:hidden fixed bottom-3 left-0 right-0 bg-white border-t-2 p-2">
        <div className="flex justify-between max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center w-auto"
            >
              <Link
                to=""
                className="mt-2 border rounded-full p-2 flex-shrink-0 bg-gray-800 hover:bg-accentGreen focus:bg-accentGreen focus:ring-0 focus:ring-accentGreen focus:outline-none transition duration-500 group"
              >
                <img src={item.Icon} alt={item.alt} className="w-5 h-5 mb-" />
              </Link>
              {/* <p className="hidden sm:text-sm mt-1">{item.alt}</p> */}
            </div>
          ))}
        </div>

        {/* Push Icons 2px up */}
        <div className="mt-2"></div>
      </div>
    </main>
  );
};

export default SmartLockUI;
