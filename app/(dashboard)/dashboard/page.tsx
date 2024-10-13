"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { FiArrowUpRight } from "react-icons/fi"; // Import the arrow icon from react-icons

// Register Chart.js components including CategoryScale
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, CategoryScale);

const DashboardPage = async () => {

  // Sample chart data
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Sales',
        data: [15000, 20000, 30000, 25000, 40000],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <main>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {/* Sales this week Card */}
        <div className="shadow rounded-xl p-4 sm:p-6 xl:p-8 2xl:col-span-2 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
              <h3 className="text-base font-normal text-gray-500">Sales this week</h3>
            </div>
            <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              12.5%
              <FiArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          {/* Chart */}
          <div className="mt-4">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Latest Transactions Card */}
        <div className="shadow rounded-xl p-4 sm:p-6 xl:p-8 bg-white">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Transactions</h3>
              <span className="text-base font-normal text-gray-500">This is a list of latest transactions</span>
            </div>
            <div className="flex-shrink-0">
              <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto rounded-lg">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {/* Sample transaction data */}
                      {[
                        { id: 'Bonnie Green', date: 'Apr 23, 2021', amount: 2300 },
                        { id: '#00910', date: 'Apr 23, 2021', amount: -670, isRefund: true },
                        { id: '#087651', date: 'Apr 18, 2021', amount: 234, isFailed: true },
                        { id: 'Lana Byrd', date: 'Apr 15, 2021', amount: 5000 },
                        { id: 'Jese Leos', date: 'Apr 15, 2021', amount: 2300 },
                        { id: 'THEMESBERG LLC', date: 'Apr 11, 2021', amount: 560 },
                        { id: 'Lana Lysle', date: 'Apr 6, 2021', amount: 1437 },
                      ].map((transaction, index) => (
                        <tr key={index} className={transaction.isRefund ? "bg-gray-50" : (transaction.isFailed ? "bg-red-50" : index % 2 === 0 ? "" : "bg-gray-50")}>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            Payment from <span className="font-semibold">{transaction.id}</span>
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">{transaction.date}</td>
                          <td className={`p-4 whitespace-nowrap text-sm font-semibold ${transaction.amount < 0 ? "text-red-500" : "text-gray-900"}`}>
                            {transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
