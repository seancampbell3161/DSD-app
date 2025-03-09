import AutoCompleteTenant from "./AutoCompleteSearch";

const DigitalLease = () => {
  
    return (
        <section className="max-w-4xl p-4 m-4 mx-auto text-center rounded-2xl bg-accentBlue">
            {/* <h2 className="mt-12 mb-4 text-3xl font-semibold">Digital Lease</h2> */}
            <AutoCompleteTenant />

            {/* <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 text-white uppercase sm:w-auto sm:px-4 bg-blue"
            >
                generate parking pass
            </button> */}

            {/* Modal with backdrop blur
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm backdrop-brightness-50">
                    <div className="w-full max-w-md p-6 bg-white shadow-lg">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment</label>
                                <input
                                    type="text"
                                    name="apartment"
                                    id="apartment"
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentGreen focus:border-accentGreen sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentGreen focus:border-accentGreen sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">License Plate Number</label>
                                <input
                                    type="text"
                                    name="licensePlate"
                                    id="licensePlate"
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentGreen focus:border-accentGreen sm:text-sm"
                                    required
                                />
                            </div>
                            {/* Centered and equal-sized buttons */}
                            {/* <div className="flex justify-center gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-accentGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */} 

        </section>
    );
};

export default DigitalLease;