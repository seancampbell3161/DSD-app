import { useState } from "react";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import api from "../../../api/api";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  complaints: any;
}

export const Modal = ({ isOpen, closeModal, complaints }: ModalProps) => {
  // useEffect(() => {
  //   document.addEventListener('click', handleOutsideClickOrTap);
  //   document.addEventListener('touchend', handleOutsideClickOrTap);
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClickOrTap);
  //     document.removeEventListener('touchend', handleOutsideClickOrTap);
  //   };
  // }, [handleOutsideClickOrTap]);

  const [formData, setFormData] = useState({
    complaintType: "",
    message: "",
    timeCreated: "",
    complaintStatus: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(`/complaints`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      complaints((prev) => [...prev, data]);
      toast.success("Complaint submitted successfully!");
      closeModal();
      setFormData(null);
      console.log("Success:", data);
    } catch (error) {
      toast.error("Must select type of complaint");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          id="complaint-modal"
          className="modal z-10 fixed inset-0 bg-charcoal/75 backdrop-blur-sm  flex justify-center items-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content bg-beige p-6 w-full max-w-sm shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} action="">
              <FormControl className="w-full items-center">
                <FormLabel
                  id="radio-buttons-group-label"
                  className="font-body text-charcoal text-2xl text-center"
                >
                  {" "}
                  Have A Complaint?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-buttons-group-label"
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="noise"
                    control={<Radio />}
                    label="Noise"
                  />
                  <FormControlLabel
                    value="repair"
                    control={<Radio />}
                    label="Repair"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                <div>
                  <p className="description-body font-body text-lg text-center py-4 text-charcoal">
                    Leave a brief description in order that Super can best serve
                    you.
                  </p>
                  <div className="description-input pb-6">
                    <label htmlFor="description"></label>
                    <input
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="brief description..."
                      className="bg-grey-100 border-grey-400 rounded-md w-full h-auto border-1 placeholder-charcoal placeholder-opacity-50"
                    />
                  </div>

                  <div className="submit-row max-w-[400px] mx-auto flex justify-center gap-4">
                    <button
                      type="submit"
                      className="submit w-full px-6 py-2 bg-accentGreen text-beige rounded-sm focus:outline-none"
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
              </FormControl>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
