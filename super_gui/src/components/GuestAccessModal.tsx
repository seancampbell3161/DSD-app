// Interface
interface ModalProps {
  : boolean;
  : (value: boolean) => void;
  : (value: boolean) => void;
}

const FrontDoorModal: React.FC<ModalProps> = ({
 
}) => {
  if (!) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-sm shadow-lg rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-4">Do You Want To Proceed?</h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              (true);
            }}
            className="w-full px-6 py-2 bg-accentGreen text-white rounded-sm focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={() => {
              (false);
            }}
            className="w-full px-6 py-2 bg-red text-white rounded-sm focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontDoorModal;
