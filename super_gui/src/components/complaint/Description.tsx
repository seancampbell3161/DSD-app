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
          <input type="text" placeholder="brief description..." className="bg-lightGrey border-2 border-black w-full h-[100px] text-charcoal"/>
          <div className="submit-row flex flex-row gap-4 py-4 max-w-[120px] mx-auto">
            <button className="bg-charcoal w-20 h-10 text-beige" onClick={handleDescriptionClose} onTouchEnd={handleDescriptionClose}>
              cancel
            </button>
            <button className="bg-charcoal w-20 h-10 text-beige">
              submit
            </button>
          </div>
        </div>
      )}
    </>
  )
}