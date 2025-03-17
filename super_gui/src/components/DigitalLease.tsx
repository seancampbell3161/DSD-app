import AutoCompleteTenant from "./AutoCompleteSearch";

const DigitalLease = () => {
  
    return (
        <section className="max-w-4xl h-auto p-[40px] m-4 mx-auto text-center rounded-2xl h-[450px] bg-accentBlue">
            {/* <h2 className="mt-12 mb-4 text-3xl font-semibold">Digital Lease</h2> */}
            <AutoCompleteTenant />

            {/* <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 text-white uppercase sm:w-auto sm:px-4 bg-blue"
            >
                generate parking pass
            </button> */}

        </section>
    );
};

export default DigitalLease;