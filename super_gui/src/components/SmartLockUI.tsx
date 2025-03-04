import { Link } from "react-router-dom";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import User from "/assets/icons/bxs-user.svg";
import Lease from "/assets/icons/bxs-pen.svg";
import Lock from "/assets/icons/bx-lock-alt.svg";
import DigitalLease from "./DigitalLease"

const SmartLockUI = () => {
  const menuItems = [
    { Icon: FrontDoor, alt: "FrontDoor" },
    { Icon: Parking, alt: "Parking" },
    { Icon: Complaints, alt: "Complaints" },
    { Icon: Lease, alt: "Lease" },
    { Icon: SmartLocker, alt: "SmartLocker" },
  ];

  return (
    <main className="relative min-h-screen pb-16 md:pb-0">
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
      <main className="max-w-4xl p-4 m-4 mx-auto">
        <h1 className="mb-4 text-xl font-semibold text-center sm:text-2xl md:text-3xl">
          Welcome Back: Rudy Moto!
        </h1>
        <div className="overflow-hidden border shadow-md rounded-xl">
          <div className="flex flex-col gap-4 md:flex-row md:gap-0">
            {/* DESKTOP FRONT DOOR LAYOUT */}
            {/* <div className="flex justify-center p-4 md:p-6 md:w-1/2">
              <div className="hidden w-full max-w-sm p-6 transition border shadow-sm md:flex md:flex-col md:items-center md:justify-center rounded-2xl hover:shadow">
                <div className="flex items-center justify-center w-32 h-32 mb-4 border rounded-full shadow-sm">
                  <img src={Lock} alt="Lock" className="w-20 h-20" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Front Door</h2>
                <p className="mb-6 text-center">Status: Locked</p>
                <div className="flex w-full max-w-xs">
                  <button className="w-1/2 px-4 py-2 font-medium transition border rounded-l-lg hover:bg-gray-50 active:bg-gray-100">
                    Lock
                  </button>
                  <button className="w-1/2 px-4 py-2 font-medium transition border rounded-r-lg hover:bg-gray-50 active:bg-gray-100">
                    Unlock
                  </button>
                </div>
              </div> */}

              {/* MOBILE FRONT DOOR LAYOUT */}
              {/* <div className="flex flex-row w-full p-4 border shadow-sm md:hidden rounded-2xl">
                <div className="flex items-center justify-center w-24 h-24 mr-4 border rounded-full shadow-sm sm:h-28 sm:w-28">
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
                  <p className="mb-4">Status: Locked</p>
                  <div className="flex w-full">
                    <button className="w-1/2 px-3 py-2 font-medium transition border rounded-l-lg sm:px-4 active:bg-gray-100">
                      Lock
                    </button>
                    <button className="w-1/2 px-3 py-2 font-medium transition border rounded-r-lg sm:px-4 active:bg-gray-100">
                      Unlock
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            {/* DESKTOP GUEST LAYOUT */}
            {/* <div className="flex justify-center p-4 md:p-6 md:w-1/2">
              <div className="hidden w-full max-w-sm p-6 transition border shadow-sm md:flex md:flex-col md:items-center md:justify-center rounded-2xl hover:shadow">
                <div className="flex items-center justify-center w-32 h-32 mb-4 border rounded-full shadow-sm">
                  <img src={User} alt="User" className="w-20 h-20" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Guest</h2>

                <div className="flex justify-center w-full mb-6">
                  <div className="flex flex-col w-full max-w-md gap-2 px-3 py-2 mx-auto border rounded-lg shadow-sm">
                    <span className="p-1 px-3 overflow-hidden font-mono text-center border rounded-sm text-ellipsis whitespace-nowrap">
                      USad23@
                    </span>
                    <span className="text-sm text-center">Exp: 24hrs</span>
                  </div>
                </div>

                <div className="flex w-full max-w-xs">
                  <button className="w-1/2 px-4 py-2 font-medium transition border rounded-l-lg hover:bg-gray-50 active:bg-gray-100">
                    Generate
                  </button>
                  <button className="w-1/2 px-4 py-2 font-medium transition border rounded-r-lg hover:bg-gray-50 active:bg-gray-100">
                    Delete
                  </button>
                </div>
              </div> */}

              {/* MOBILE GUEST LAYOUT */}
              {/* <div className="flex flex-row w-full p-4 border shadow-sm md:hidden rounded-2xl">
                <div className="flex items-center justify-center w-24 h-24 mr-4 border rounded-full shadow-sm sm:h-28 sm:w-28">
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
                  <div className="flex w-full">
                    <button className="w-1/2 px-3 py-2 font-medium transition border rounded-l-lg sm:px-4 active:bg-gray-100">
                      Generate
                    </button>
                    <button className="w-1/2 px-3 py-2 font-medium transition border rounded-r-lg sm:px-4 active:bg-gray-100">
                      Delete
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
      <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border-t-2 shadow-lg md:hidden">
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
