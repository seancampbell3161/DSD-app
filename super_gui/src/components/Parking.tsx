import { useState } from "react";
import Activeparkpass from "./Activeparkpass";

const Parking = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="p-4 bg-beige text-center h-full">
            <h2 className="mt-12 mb-4 text-3xl font-semibold">Guest Parking</h2>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto sm:px-4 py-2 bg-blue text-white uppercase"
            >
                generate parking pass
            </button>

            {/* Modal with backdrop blur */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm backdrop-brightness-50 flex justify-center items-center">
                    <div className="bg-white p-6 w-full max-w-md shadow-lg">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment</label>
                                <input
                                    type="text"
                                    name="apartment"
                                    id="apartment"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentGreen focus:border-accentGreen sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentGreen focus:border-accentGreen sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">License Plate Number</label>
                                <input
                                    type="text"
                                    name="licensePlate"
                                    id="licensePlate"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentGreen focus:border-accentGreen sm:text-sm"
                                    required
                                />
                            </div>
                            {/* Centered and equal-sized buttons */}
                            <div className="flex justify-center gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accentGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Activeparkpass />
        </section>
    );
};

export default Parking;