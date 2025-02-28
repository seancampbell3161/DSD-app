const Activeparkpass = () => {
    return (
        <section className="mt-7 bg-white">
            <h3 className="text-lg font-semibold mb-4">Active Passes</h3>

            <table className="table-fixed w-full">
                <thead>
                    <tr className="border-b border-grey-400">
                        <th className="w-1/3 p-2 text-left font-normal border-b border-grey-400">Name</th>
                        <th className="w-1/3 p-2 text-left font-normal border-b border-grey-400">Plate</th>
                        <th className="w-1/3 p-2 text-left font-normal">Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-grey-400">
                        <td className="w-1/3 p-2 text-left border-r border-grey-400">John Doe</td>
                        <td className="w-1/3 p-2 text-left border-r border-grey-400">12345</td>
                        <td className="w-1/3 p-2 text-left">1:45:00</td>
                    </tr>
                    <tr className="border-b border-grey-400">
                        <td className="w-1/3 p-2 text-left border-r border-grey-400">Jane Doe</td>
                        <td className="w-1/3 p-2 text-left border-r border-grey-400">98765</td>
                        <td className="w-1/3 p-2 text-left">32:00</td>
                    </tr>
                </tbody>
            </table>

            <p className="m-7">Contact management if more than 3 guest passes are needed.</p>
        </section>
    );
};

export default Activeparkpass;