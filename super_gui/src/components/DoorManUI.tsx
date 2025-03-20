import { useState } from "react";

// Interface for package lockers
interface PackageLocker {
  id: number;
  lockerNumber: number;
  status: string;
  apartmentNumber?: string;
}

const DoorManUI = () => {
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [selectedLocker, setSelectedLocker] = useState("");

  // Mock data for lockers
  const [lockers, setLockers] = useState<PackageLocker[]>([
    { id: 1, lockerNumber: 1, status: "Apartment #4", apartmentNumber: "4" },
    { id: 2, lockerNumber: 2, status: "Empty" },
    { id: 3, lockerNumber: 3, status: "Empty" },
    { id: 4, lockerNumber: 4, status: "Empty" },
    { id: 5, lockerNumber: 5, status: "Empty" },
    { id: 6, lockerNumber: 6, status: "Empty" },
    { id: 7, lockerNumber: 7, status: "Empty" },
  ]);

  // Mock function to assign package
  const assignPackage = () => {
    if (!apartmentNumber || !selectedLocker) {
      return;
    }
    // Mock implementation
  };

  // Mock function to discard package
  const discardPackage = (id: number) => {
    // Mock implementation
  };

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      <div className="mx-auto max-w-4xl m-4 p-4">
        <div className="border rounded-xl shadow-md overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-accentBlue">
            Tenant Package Management
          </h1>
          <div className="flex flex-col md:flex-row justify-center gap-4 bg-accentBlue p-4">
            {/* Package Assignment Section - LEFT */}
            <div className="md:w-1/2 flex justify-center">
              <div className="flex flex-col items-center justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white h-full">
                <div className="w-full mb-6">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Package Assignment
                  </h2>
                  <hr className="border-[#D3C9B8] w-full mt-2" />
                </div>

                {/* Input Fields */}
                <div className="w-full mb-4">
                  <div className="flex flex-col mb-3">
                    <label className="mb-1 font-body text-charcoal">
                      Apartment Number
                    </label>
                    <input
                      type="text"
                      className="border border-beige rounded p-2"
                      placeholder="Enter apartment number"
                      value={apartmentNumber}
                      onChange={(e) => setApartmentNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label className="mb-1 font-body text-charcoal">
                      Locker Number (1-7)
                    </label>
                    <select
                      className="border border-beige rounded p-2"
                      value={selectedLocker}
                      onChange={(e) => setSelectedLocker(e.target.value)}
                    >
                      <option value="">Select a locker</option>
                      <option value="1">Locker 1</option>
                      <option value="2">Locker 2</option>
                      <option value="3">Locker 3</option>
                      <option value="4">Locker 4</option>
                      <option value="5">Locker 5</option>
                      <option value="6">Locker 6</option>
                      <option value="7">Locker 7</option>
                    </select>
                  </div>
                  <button
                    className="bg-accentBlue text-white py-2 px-4 rounded font-body w-full"
                    onClick={assignPackage}
                  >
                    Submit
                  </button>
                </div>

                <p className="mt-auto text-charcoal italic text-center">
                  Packages will be removed after 7 days if not picked up.
                </p>
              </div>
            </div>

            {/* Locker Status Section - RIGHT */}
            <div className="md:w-1/2 flex justify-center">
              <div className="flex flex-col items-center justify-start border rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white h-full">
                <div className="w-full mb-6">
                  <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
                    Locker Status
                  </h2>
                  <hr className="border-[#D3C9B8] w-full mt-2" />
                </div>

                <div className="w-full">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-beige">
                        <th className="p-2 text-left font-body border-b border-beige">
                          Locker Number
                        </th>
                        <th className="p-2 text-center font-body border-b border-beige">
                          Status
                        </th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {lockers.map((locker) => (
                        <tr key={locker.id} className="border-b border-beige">
                          <td className="p-2 text-left border-r border-beige">
                            {locker.lockerNumber}
                          </td>
                          <td
                            className={`p-2 text-center border-r border-beige ${
                              locker.status === "Empty"
                                ? "italic text-charcoal"
                                : ""
                            }`}
                          >
                            {locker.status}
                          </td>
                          <td className="p-1">
                            {locker.status !== "Empty" && (
                              <button
                                className="bg-accentBlue text-white py-1 px-2 rounded text-sm"
                                onClick={() => discardPackage(locker.id)}
                              >
                                Discard
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoorManUI;
