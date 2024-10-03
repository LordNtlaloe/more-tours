import Link from 'next/link';
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Widget = ({ page, data, icon }) => {
    const total = page !== "revenue" ? data?.length : `$${data}`;
    const rate = "5%"; // Example rate data; replace with dynamic values
    const levelUp = true; // Example logic for rate up/down

    return (
<div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark transition-all hover:shadow-lg cursor-pointer">            <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-dark">
                    {icon}
                </div>
                <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {total}
                    </h4>
                    <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">{page}</span>
                </div>
            </div>

            <div className="mt-3 sm:mt-4 flex items-center justify-between">
                <span
                    className={`flex items-center gap-1 text-sm font-medium ${levelUp ? "text-green-500" : "text-red-500"}`}
                >
                    {rate}
                    {levelUp ? (
                        <FaArrowUp className="w-3 h-3 text-green-500" />
                    ) : (
                        <FaArrowDown className="w-3 h-3 text-red-500" />
                    )}
                </span>
            </div>

            <div className="mt-3 sm:mt-4">
                <Link className="text-blue-500 hover:text-blue-700 transition border-b border-transparent hover:border-blue-500" href={`/admin/${page}`}>
                    See all
                </Link>
            </div>
        </div>
    );
};

export default Widget;
