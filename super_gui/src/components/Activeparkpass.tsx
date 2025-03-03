import { useState } from "react";

const Activeparkpass = () => {
    const [showLicensePlate, setShowLicensePlate] = useState(false);

    // Sample data - this data would come from the DB on load, if any
    const data = [
        { id: 1, name: "John Doe", licensePlate: "ABC-123", code: "12345", time: "1:45:00" },
        { id: 2, name: "Jane Smith", licensePlate: "XYZ-789", code: "12345", time: "32:00" },
        { id: 3, name: "Alice Johnson", licensePlate: "DEF-456", code: "12345", time: "12:27" },
    ];

    const toggleDisplay = () => {
        setShowLicensePlate((prev) => !prev);
    };

    return (
        <section className="mt-7 py-3 px-2 bg-white">
            <h3 className="text-lg font-semibold m-2 ml-4 text-left">Active Passes</h3>

            <table className="table-fixed w-full">
                <thead>
                    <tr className="border-b border-beige">
                        <th
                            className="w-1/3 p-2 text-left font-normal border-b border-beige cursor-pointer"
                            onClick={toggleDisplay}
                        >
                            Name / Plate
                        </th>
                        <th className="w-1/3 p-2 text-left font-normal border-b border-beige">Access Code</th>
                        <th className="w-1/3 p-2 text-left font-normal border-b border-beige">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pass) => (
                        <tr key={pass.id} className="border-b border-beige">
                            <td className="w-1/3 p-2 text-left border-r border-beige">
                                {showLicensePlate ? pass.licensePlate : pass.name}
                            </td>
                            <td className="w-1/3 p-2 text-left border-r border-beige">{pass.code}</td>
                            <td className="w-1/3 p-2 text-left">{pass.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="m-7 text-charcoal italic">Contact management if more than 3 guest passes are needed.</p>
        </section>
    );
};

export default Activeparkpass;