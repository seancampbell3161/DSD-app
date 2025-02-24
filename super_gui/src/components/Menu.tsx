import React from "react";
import smartLock from '../assets/padlock.png'
import parcel from '../assets/parcels.png'
import complaint from '../assets/hypothesis.png'
import car from '../assets/car.png'
import lease from '../assets/writing.png'

const Menu = () => {
    return (
        <nav className="grid grid-cols-5 gap-5 mx-7 my-4">
            <button><img src={smartLock} alt="Smart Locks" /></button>
            <button><img src={parcel} alt="Parcels" /></button>
            <button><img src={complaint} alt="Complaints" /></button>
            <button><img src={car} alt="Guest Parking" /></button>
            <button><img src={lease} alt="Leases" /></button>
        </nav>
    );
};

export default Menu;
