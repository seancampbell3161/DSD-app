import { useState } from 'react';
import { Description } from "./Description";
import { Modal } from "./modal/Modal";

// Acceptance criteria for MVP


// The resident can select a complaint from a list of options (3-4 buttons)

// the button records : complaint type, time, date, location( room# ).

// Brief 200 character input w/ submit button

// The system escalates the issue to property management with a detailed report.

// include summary of complaints. (a table with buttons? download report cta)

export const Complaint = () => {
  const [isDescriptionOpen, setDescriptionOpen,] = useState(false);

  const handleOutsideClickOrTap = (e: MouseEvent | TouchEvent) => {
    if (isDescriptionOpen || isModal) {
      const target = e.target as HTMLElement;
      if (!target.closest('.Complaint')) {
        handleDescriptionClose();
        handleModalClose();
      }
    }
  };

  const handleDescriptionOpen = () => {
    setDescriptionOpen(true);
  }

  const handleDescriptionClose = () => {
    setDescriptionOpen(false);
  }

  const [isModal, setIsModal] = useState(false);

  const handleModalClose = () => {
    setIsModal(false);
  }

  return (
    <section>
      <div className="Complaint border-2 border-red relative bottom-0">
        <div className="complaint-header flex flex-row justify-between">
          <h1>Have a complaint?</h1>
            <button 
            className={`close-button ${isDescriptionOpen || isModal ? 'block' : 'hidden'} ${!isModal || !isDescriptionOpen ? 'hidden' : ''}`} 
            onClick={() => { handleDescriptionClose(); handleModalClose(); }}
            onTouchEnd={() => { handleDescriptionClose(); handleModalClose(); }}
            >
              close
            </button>
        </div>
        {isDescriptionOpen && window.innerWidth < 431 ? (
          <div className="description" id="description">
            <Description 
              isDescriptionOpen={isDescriptionOpen}
              handleDescriptionClose={handleDescriptionClose}
              onClick={handleDescriptionClose}
              onTouchEnd={handleDescriptionClose}
              handleOutsideClickOrTap={handleOutsideClickOrTap}
            />
          </div>
        ) : (
          window.innerWidth > 431 && (
            <Modal 
              isOpen={isModal} 
              closeModal={handleModalClose}
              handleOutsideClickOrTap={handleOutsideClickOrTap}
            />
          )
        )}
        <div className={'buttons-grid'}>
          <button onClick={() => { handleDescriptionOpen(); setIsModal(true); }} onTouchEnd={() => { handleDescriptionOpen(); setIsModal(true); }}>
          Noise
          </button>
          <button onClick={() => { handleDescriptionOpen(); setIsModal(true); }} onTouchEnd={() => { handleDescriptionOpen(); setIsModal(true); }}>
          Super
          </button>
          <button onClick={() => { handleDescriptionOpen(); setIsModal(true); }} onTouchEnd={() => { handleDescriptionOpen(); setIsModal(true); }}>
          Fixes
          </button>
        </div>
      </div>
    </section> 
  )
}