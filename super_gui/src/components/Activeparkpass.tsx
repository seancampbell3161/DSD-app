import { useState } from "react";
import Parking from "./Parking";
import Placeholder from "/assets/images/placeholder.jpg";
import trashCan from "/assets/icons/bin.svg";
import swap from "/assets/icons/swap.svg";

const Activeparkpass = () => {
  const [showLicensePlate, setShowLicensePlate] = useState(false);

  // Temporary Mock Data
  const data = [
    {
      id: 1,
      name: "John Doe",
      licensePlate: "ABC-123",
      code: "12345",
      time: "1:45:00",
    },
    {
      id: 2,
      name: "Jane Smith",
      licensePlate: "XYZ-789",
      code: "12345",
      time: "32:00",
    },
    {
      id: 3,
      name: "Alice Johnson",
      licensePlate: "DEF-456",
      code: "12345",
      time: "12:27",
    },
    {
      id: 4,
      name: "Al Johnson",
      licensePlate: "DEF-456",
      code: "12345",
      time: "12:27",
    },
    {
      id: 5,
      name: "Tim Son",
      licensePlate: "DEF-456",
      code: "12345",
      time: "12:27",
    },
  ];

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
                    <p className="text-sm">Room: 204</p>
                  </h1>
                  <Parking />
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
                          Time
                        </th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((pass) => (
                        <tr key={pass.id} className="border-b border-beige">
                          <td className="p-2 text-left border-r border-beige">
                            {showLicensePlate ? pass.licensePlate : pass.name}
                          </td>
                          <td className="p-2 text-left border-r border-beige">
                            {pass.code}
                          </td>
                          <td className="p-2 text-left">{pass.time}</td>
                          <td className="p-2">
                            <div className="flex justify-end">
                              <img src={trashCan} alt="Bin" className="h-5" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center sm:hidden">
                  <Parking />
                </div>
                <p className="mt-6 text-charcoal italic text-center">
                  Contact management if more than 3 guest passes are needed.
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
