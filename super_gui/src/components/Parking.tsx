import { useState } from "react";
import UserProfile from "./UserProfile";
import Activeparkpass from "./Activeparkpass";

const Parking = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
            <section className="sm:grid sm:grid-cols-2 sm:gap-4 p-4 bg-beige text-center min-h-screen">
                <div className='sm:bg-white self-start sm:mt-7 sm:p-5 sm:rounded'>
                    <h2 
                        className="mt-12 mb-4 text-3xl font-semibold
                                    sm:text-lg sm:font-semibold sm:m-2 sm:ml-4 sm:text-left">
                    Guest Parking</h2>

                    <div className="hidden sm:block">
                        <UserProfile />
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto sm:px-4 py-2 rounded bg-blue text-white uppercase"
                    >
                        generate parking pass
                    </button>
                    {/* Modal with backdrop blur */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm backdrop-brightness-50 flex justify-center items-center">
                            <div className="bg-white p-6 w-full max-w-md shadow-lg sm:rounded">
                                <form>
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
                </div>


                <div>
                    <Activeparkpass />
                </div>
            </section>
        
    );
};

export default Parking;