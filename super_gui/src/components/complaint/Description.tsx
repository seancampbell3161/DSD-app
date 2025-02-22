import { useEffect } from "react";

interface DescriptionProps {
  isDescriptionOpen: boolean;
  handleDescriptionClose: () => void;
  onClick: () => void;
  onTouchEnd: () => void;
  handleOutsideClickOrTap: (event: MouseEvent | TouchEvent) => void;
}

export const Description = ({ isDescriptionOpen, handleDescriptionClose, handleOutsideClickOrTap }: DescriptionProps) => {
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
      {isDescriptionOpen && (
        <div>
          <p className="description-body">
            Leave a brief description in order that Super can best serve you.
          </p>
          <input type="text" placeholder="brief description..." className="bg-lightGrey border-2 border-black"/>
          <div className="submit-row">
            <button onClick={handleDescriptionClose} onTouchEnd={handleDescriptionClose}>
              cancel
            </button>
            <button>
              submit
            </button>
          </div>
        </div>
      )}
    </>
  )
}