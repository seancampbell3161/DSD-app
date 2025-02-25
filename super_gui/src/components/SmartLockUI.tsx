// import { useState } from "react";

const SmartLockUI = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 justify-center gap-6">
      <div className="flex justify-center">
        <img className="rounded-2xl border" />
        <div className="flex justify-center">
          <div className="flex flex-col items-center mr-6 -my-4 whitespace-nowrap">
            <h2 className="text-white text-xs md:text-base font-extrabold uppercase"></h2>
            <h2 className=" text-white text-xs md:text-base ">Starting at $</h2>
            <h2 className="text-white text-xs md:text-base ">Trims: FWD/AWD</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartLockUI;
