import { useState } from "react";
import { Modal } from "./modal/Modal";
import Placeholder from "/assets/images/placeholder.jpg";

// Acceptance criteria for MVP


// The resident can select a complaint from a list of options (3-4 buttons)

// the button records : complaint type, time, date, location( room# ).

// Brief 200 character input w/ submit button

// The system escalates the issue to property management with a detailed report.

// include summary of complaints. (a table with buttons? download report cta)

export const Complaint = () => {
  const [isModal, setIsModal] = useState(false);

  const handleOutsideClickOrTap = (e: MouseEvent | TouchEvent) => {
    if (isModal) {
      const target = e.target as HTMLElement;
      if (!target.closest('.Complaint')) {
        handleModalClose();
      }
    }
  };

  const handleModalClose = () => {
    setIsModal(false);
  }

  return (
    <section>
      <div className="Complaint max-w-4xl h-full my-auto mx-auto py-6 px-4 md:bg-accentBlue rounded-xl overflow-hidden">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            Hello, Laura Johnson
          </h1>
        <div className="complaint-desktop hidden md:flex md:flex-row md:justify-between">
          <div className="user-profile hidden md:flex md:flex-col md:items-center md:justify-start rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow transition bg-white">
            <h2 className="text-xl text-center font-medium font-[Roboto Condensed]">
              Have a Complaint?
            </h2> 
            <div className="user-info flex flex-col justify-center items-center">
              <div className="relative flex justify-center rounded-full h-32 w-32 shadow-sm">
                <img
                  src={Placeholder}
                  alt="Placeholder"
                  className="w-32 h-32 border rounded-full"
                />
              </div>
              <h1>Laura Johnson</h1>
              <p className="text-sm">Room: 204</p>
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={() => { setIsModal(true); }} onTouchEnd={() => { setIsModal(true); }}
                className="border rounded-sm py-2 px-4 w-full text-white font-medium bg-[#0A2342] transition capitalize"
              >
                File a Complaint
              </button>
            </div>
          </div>
          <div className="complaint-table rounded-xl p-4 md:p-6 md:w-1/2 bg-white">
            <h1 className="">latest Complaint</h1>
          </div>
        </div>
        <Modal 
          isOpen={isModal} 
          closeModal={handleModalClose} 
          handleOutsideClickOrTap={handleOutsideClickOrTap} 
        />
      </div>
    </section> 
  )
}