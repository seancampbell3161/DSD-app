import { Link } from "react-router-dom";
import { Modal } from "../components/complaint/modal/Modal";
import FrontDoor from "/assets/icons/bx-door-open.svg";
import Parking from "/assets/icons/bxs-parking.svg";
import Complaints from "/assets/icons/bxs-folder-open.svg";
import SmartLocker from "/assets/icons/bxs-package.svg";
import Lease from "/assets/icons/bxs-pen.svg";

interface NavProps {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  handleModalClose: () => void;
}

export const Nav: React.FC<NavProps> = ({
  isModal,
  handleModalClose,
}) => {

  const menuItems = [
    { Icon: FrontDoor, alt: "FrontDoor" },
    { Icon: Parking, alt: "Parking" },
    { Icon: Complaints, alt: "Complaints" },
    { Icon: Lease, alt: "Lease" },
    { Icon: SmartLocker, alt: "SmartLocker" },
  ];

  // this event handler is for the mobile screen button to just navigate to the complaint log and open the modal after.
  // const handleComplaintClick = (e: React.MouseEvent | React.TouchEvent) => {
  //   if (window.innerWidth < 431) {
  //     e.preventDefault();
  //     navigate("/complaint");
  //     setIsModal(true);
  //   }
  // };

  return (
    <section className="z-10 fixed w-full md:relative bottom-0 left-0">
      <div className="artBorder md:hidden bg-charcoal w-full flex flex-row pt-[6px] gap-1.5">
        <span className="whiteStripe bg-white min-w-1/3 h-[20px] inline-block"></span>
        <span className="redStripe bg-red min-w-1/2 h-[20px] inline-block"></span>
        <span className="yellowStripe block min-w-1/6 h-[20px] bg-accentYellow"></span>
      </div>
      <nav className="nav px-[10px] md:py-2 md:px-10 md:mb-10 md:mt-0.5 md:max-w-fit mx-auto bg-charcoal md:bg-white md:rounded-full">
        <ul className="flex flex-row justify-between gap-2 md:gap-6 items-center">
          {menuItems.map((item, index) => (
            <li
              key={index}
              id={index.toString()}
              className={`nav-item flex-shrink-0 relative ${
                index === 2
                  ? "border-6 border-brown md:border-none rounded-full -top-14 md:top-0 w-[86px] h-[86px] md:w-[50px] md:h-[50px]"
                  : ""
              }`}
            >
              <Link
                to={
                  index === 0
                    ? "/"
                    : index === 1
                    ? "/parking"
                    : index === 2
                    ? "/complaint"
                    : index === 3
                    ? "/lease"
                    : "/doormanui"
                }
                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center hover:bg-green focus:bg-green focus:ring-0 focus:outline-green
                focus:inset-shadow-none transition duration-500 group ${
                  index === 2
                    ? "bg-accentBlue md:bg-beige relative md:top-0 w-full h-full border-1 border-[#1D478B] md:border-none md:shadow-none md:inset-shadow-none inset-shadow-sm inset-shadow-[#4595F8] shadow-md shadow-[#1358AE]/50 focus:border-none focus:shadow-none focus:border-transparent inset-shadow-sm-bottom"
                    : "bg-beige"
                }`}
              >
                <img src={item.Icon} alt={item.alt} className="w-6 h-6" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Modal isOpen={isModal} closeModal={handleModalClose} complaints={null} />
    </section>
  );
};

export default Nav;
