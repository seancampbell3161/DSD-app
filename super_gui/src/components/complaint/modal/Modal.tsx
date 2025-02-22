import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleOutsideClickOrTap: (event: MouseEvent | TouchEvent) => void;
}

export const Modal = ({ isOpen, closeModal,handleOutsideClickOrTap }: ModalProps) => {
  useEffect(() => {
    document.addEventListener('click', handleOutsideClickOrTap);
    document.addEventListener('touchend', handleOutsideClickOrTap);
    return () => {
      document.removeEventListener('click', handleOutsideClickOrTap);
      document.removeEventListener('touchend', handleOutsideClickOrTap);
    };
  }, [handleOutsideClickOrTap]);

  return (
    <>
      {isOpen && (
        <div className="modal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div>
              <p className="description-body">
                Leave a brief description in order that Super can best serve you.
              </p>
              <input type="text" placeholder="brief description..." className="bg-lightGrey border-2 border-black"/>
              <div className="submit-row">
                <button onClick={closeModal} onTouchEnd={closeModal}>
                  cancel
                </button>
                <button>
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}