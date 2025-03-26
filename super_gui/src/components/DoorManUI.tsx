import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Interface for package lockers
interface PackageLocker {
  id: number;
  lockerNumber: number;
  apartmentNumber: number | null;
}

const DoorManUI = () => {
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [selectedLocker, setSelectedLocker] = useState("");
  const [lockers, setLockers] = useState<PackageLocker[]>([]);

  const buildingId = 1001; //This app only has one building

  // GET all lockers in the building
  useEffect(() => {
    const fetchBuildingLockers = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/buildings/${buildingId}/lockers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data: PackageLocker[] = await res.json();
          setLockers(data);
          console.log(`Locker Status:`, data);
        } else {
          console.error("Failed to fetch locker status");
        }
      } catch (error) {
        console.error("Failed all available lockers", error);
      }
    };
    fetchBuildingLockers();
  }, []);

  // PATCH To Assign Packages
  const assignPackage = async (lockerId: number, apartmentNumber: string) => {
    try {
      const res = await fetch(`http://localhost:8080/locker/${lockerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apartmentNumber: apartmentNumber,
        }),
      });
      if (res.ok) {
        const data = await res.json();

        // Update the lockers status UI
        setLockers((prevLockers) =>
          prevLockers.map((locker) =>
            locker.id === lockerId
              ? { ...locker, apartmentNumber: Number(apartmentNumber) }
              : locker
          )
        );

        toast.success("Package has been assigned!");
        console.log(`Package assigned to:`, data);
      } else {
        console.error("Failed to assign package");
        toast.error("Failed to assign package.");
      }
    } catch (error) {
      console.error("Failed to assign package", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocker && apartmentNumber) {
      assignPackage(Number(selectedLocker), apartmentNumber);
      setApartmentNumber("");
      setSelectedLocker("");
    } else {
      toast.error("Please select both locker and apartment number.");
    }
  };

  // PATCH Packages Status
  const discardPackage = async ({ id }: { id: number }) => {
    try {
      const res = await fetch(`http://localhost:8080/locker/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apartmentNumber: null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setLockers((prevLockers) =>
          prevLockers.map((locker) =>
            locker.id === id ? { ...locker, apartmentNumber: null } : locker
          )
        );
        toast.success("Package removed from locker.");
        console.log("Package removed from locker.", data);
      } else {
        console.error("Error updating packages status:");
      }
    } catch (error) {
      console.error("Error updating packages status:", error);
    }
  };

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      <div className="mx-auto max-w-4xl m-4 p-4 pb-16 md:pb-0">
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
                <form onSubmit={handleSubmit} className="w-full mb-4">
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
                      Locker Number (1-5)
                    </label>
                    <select
                      className="border border-beige rounded p-2"
                      value={selectedLocker}
                      onChange={(e) => setSelectedLocker(e.target.value)}
                    >
                      <option value="">Select a locker</option>
                      <option value="1001">Locker 101</option>
                      <option value="1002">Locker 102</option>
                      <option value="1003">Locker 103</option>
                      <option value="1004">Locker 104</option>
                      <option value="1005">Locker 105</option>
                    </select>
                  </div>
                  <button className="bg-accentBlue text-white py-2 px-4 rounded font-body w-full">
                    Submit
                  </button>
                </form>

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
                          <td className="p-2 text-center border-r border-beige italic">
                            {locker.apartmentNumber !== null
                              ? locker.apartmentNumber
                              : "Empty"}
                          </td>
                          <td className="p-1">
                            {locker.apartmentNumber ? (
                              <button
                                className="bg-accentBlue text-white py-1 px-2 rounded text-sm"
                                onClick={() =>
                                  discardPackage({ id: locker.id })
                                }
                              >
                                Discard
                              </button>
                            ) : (
                              ""
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
