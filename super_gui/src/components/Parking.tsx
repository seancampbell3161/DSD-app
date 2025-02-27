import React from "react";

const Parking = () => {
    return (
        <section>
            <h2>Guest Parking</h2>
            <button>Create Temporary Pass</button>

            <p>module will popup with form to submit information associated with code being generated</p>

            <h3>Current Passes</h3>
            <section>
                <div>
                    <p>Name</p>
                    <button>See Code</button>
                    <button>Edit</button>
                </div>
                <span>Time Remaining</span>
            </section>

            <p>Contact SUPER if more than 3 guest passes are needed.</p>

        </section>
    );
};

export default Parking;
