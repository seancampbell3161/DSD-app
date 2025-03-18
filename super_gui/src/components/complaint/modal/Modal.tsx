import { useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleOutsideClickOrTap: (event: MouseEvent | TouchEvent) => void;
}

export const Modal = ({ isOpen, closeModal, handleOutsideClickOrTap }: ModalProps) => {
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
        <div id="complaint-modal" className="modal z-10 fixed inset-0 bg-charcoal/75 backdrop-blur-sm  flex justify-center items-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="modal-content bg-beige p-6 w-full max-w-sm shadow-lg rounded-lg">
            <FormControl
            className="w-full items-center">
              <FormLabel 
              id="radio-buttons-group-label"
              className="font-body text-charcoal text-2xl text-center"
              > Have A Complaint?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                defaultValue="noise"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="noise" control={<Radio />} label="Noise" />
                <FormControlLabel value="repair" control={<Radio />} label="Repair" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <div>
              <p className="description-body font-body text-lg text-center py-4 text-charcoal">
                Leave a brief description in order that Super can best serve you.
              </p>
                <div className="description-input pb-6">
                <input 
                  type="text" 
                  placeholder="brief description..." 
                  className="bg-grey-100 border-grey-400 rounded-md w-full h-auto border-1 placeholder-charcoal placeholder-opacity-50"
                />
                </div>
              
              <div className="submit-row max-w-[400px] mx-auto flex justify-center gap-4">
                <button
                className="w-full px-6 py-2 bg-accentGreen text-beige rounded-sm focus:outline-none"
                >
                  submit
                </button>
                <button 
                onClick={closeModal} 
                onTouchEnd={closeModal}
                className="w-full px-6 py-2 bg-red text-white rounded-sm focus:outline-none"
                >
                  cancel
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}