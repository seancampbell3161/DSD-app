import { Link } from "react-router-dom";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import Key from "/assets/icons/bxs-key.svg";
import Car from "/assets/icons/bxs-car.svg";
import User from "/assets/icons/bxs-user.svg";
import Lease from "/assets/icons/bxs-pen.svg";
import Lock from "/assets/icons/bx-lock-alt.svg";

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
      <div className="hidden md:block container mx-auto border-2 max-w-4xl ">
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
      <div className="mx-auto m-2 p-2">
        {/* Hello Moto outside the main container */}
        <h1 className="text-center text-xl mb-4">Hello Moto,</h1>

        {/* Main content container */}
        <div className="border rounded-lg overflow-hidden">
          {/* Desktop: stacked vertically with centered content
        Mobile: horizontal layout with icons on left, content on right */}
          <div className="flex flex-col md:flex-row">
            {/* Front Door Section */}
            <div className="p-4 md:w-1/2">
              {/* Desktop: centered layout */}
              <div className="hidden md:flex md:flex-col md:items-center border rounded-2xl h-full">
                <div className="flex justify-center items-center border rounded-full h-24 w-24 mb-2">
                  <img src={Lock} alt="Lock" />
                </div>
                <h2 className="text-lg mb-1">Front Door</h2>
                <p className="mb-2">Status: Locked</p>
                <div className="flex w-48">
                  <button className="border py-1 px-4 w-1/2">Lock</button>
                  <button className="border py-1 px-4 w-1/2">Unlock</button>
                </div>
              </div>

              {/* Mobile: horizontal layout */}
              <div className="flex flex-row md:hidden  mb-1 h-48 border rounded-2xl p-2">
                <div className="flex justify-center items-center border rounded-full h-24 w-24 mr-4">
                  <img src={Lock} alt="Lock" />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-lg mb-1">Front Door</h2>
                  <p className="mb-2">Status: Locked</p>
                  <div className="flex w-full max-w-xs">
                    <button className="border py-1 px-4 w-1/2">Lock</button>
                    <button className="border py-1 px-4 w-1/2">Unlock</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Section */}
            <div className="p-4 md:w-1/2">
              {/* Desktop: centered layout */}
              <div className="hidden md:flex md:flex-col md:items-center border rounded-2xl ">
                <div className="flex justify-center items-center border rounded-full h-24 w-24 mb-2 ">
                  <div className="flex flex-col items-center">
                    <img src={User} alt="User" className="" />
                  </div>
                </div>
                <h2 className="text-lg mb-1">Guest</h2>
                <div className="flex mb-2">
                  <span className="border px-2 py-1">
                    <span>USad23@ </span>
                    <span>Exp: 24hrs</span>
                  </span>
                </div>
                <div className="flex w-48">
                  <button className="border py-1 px-4 w-1/2">Generate</button>
                  <button className="border py-1 px-4 w-1/2">Delete</button>
                </div>
              </div>

              {/* Mobile: horizontal layout */}
              <div className="flex flex-row md:hidden h-48 border rounded-2xl p-2">
                <div className="flex justify-center items-center border rounded-full h-24 w-24 mr-4">
                  <div className="flex flex-col items-center">
                    <img src={User} alt="User" className="" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-lg mb-1">Guest</h2>
                  <div className="flex mb-2">
                    <span className="border px-2 py-1">
                      <span>USad23@ </span>
                      <span>Exp: 24hrs</span>
                    </span>
                  </div>
                  <div className="flex w-full max-w-xs">
                    <button className="border py-1 px-4 w-1/2">Generate</button>
                    <button className="border py-1 px-4 w-1/2">Delete</button>
                  </div>
                </div>
              </div>
            </div>
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
