import React, { useState, useEffect } from 'react';
import axios from "../Utills/AxiosWithJWT.jsx";
import { useBankingSystem } from '../Context/UserContext.jsx';
import NavbarDashboard from './NavbarDashboard.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowUpTrayIcon, BanknotesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const DashboardTransferMoney = () => {
  const { BASE_URL, userDetails } = useBankingSystem();
  const [selectedBeneficiary, setSelectedbeneficiary] = useState();
  const [benefeciaryOption, setBenefeciaryOption] = useState([]);
  const [toAccount, setToAccount] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  const navigateTo = useNavigate();

  const getUserBeneficiaries = async () => {
    const resp = await axios.get(`${BASE_URL}/beneficiaries/user/${userDetails?.userId}`);
    setBenefeciaryOption(resp.data);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
    getUserBeneficiaries();
  }, [userDetails]);

  const handleFundTransferSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { accountno: userDetails?.accounts[0]?.accountno };
      const resp = await axios.post(`${BASE_URL}/fund/transfer`, data, {
        params: { toAccount: selectedBeneficiary, amount, description }
      });

      if (resp.status === 200) toast.success("Transaction successfully done!");
    } catch (error) {
      toast.error("Transaction failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <NavbarDashboard />

      <section className="max-w-7xl mx-auto p-6 mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Dashboard</h2>

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          {/* Operations Section */}
          <div className="flex flex-col items-center gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg w-full lg:w-1/3">
            <h3 className="text-xl font-semibold">Operations</h3>
            <NavLink to="/dashboard/balance" className='operation-card'>
              <BanknotesIcon className='w-6 h-6' />
              <span>Check Balance</span>
            </NavLink>

            <NavLink to="/dashboard/trx" className='operation-card'>
              <ArrowUpTrayIcon className='w-6 h-6' />
              <span>Transfer Amount</span>
            </NavLink>

            <NavLink to="/dashboard/Stmt" className='operation-card'>
              <DocumentTextIcon className='w-6 h-6' />
              <span>Statements</span>
            </NavLink>
          </div>

           {/* Transfer Section */}
          <div className="flex-1 bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Amount Transfer</h2>

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <button onClick={() => navigateTo("/dashboard/trx/addbene")} className="bg-gray-100 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                Add Beneficiaries
              </button>
              <button onClick={() => navigateTo("/dashboard/trx/seebene")} className="bg-gray-100 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                View/Update Beneficiaries
              </button>
            </div>

            <div className="mb-6">
              <select
                onChange={(e) => setSelectedbeneficiary(e.target.value)}
                className="mt-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  >
                <option className="mt-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400">Select Beneficiary</option>
                {benefeciaryOption?.map((options) => (
                  <option key={options.beneficiaryid} value={options.beneaccountno}>
                    {options.beneficiaryname}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleFundTransferSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <label className="flex flex-col text-white w-full">
                  From Account:
                  <input
                    type="number"
                    required
                    value={userDetails?.accounts[0]?.accountno}
                    readOnly
                    className="mt-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  />
                </label>

                <label className="flex flex-col text-white w-full">
                  To Account:
                  <input
                    type="number"
                    required
                    value={selectedBeneficiary}
                    onChange={(e) => setToAccount(e.target.value)}
                    className="mt-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <label className="flex flex-col text-white w-full">
                  Amount:
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  />
                </label>

                <label className="flex flex-col text-white w-full">
                  Remark:
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  />
                </label>
              </div>

              <div className="flex justify-center">
                <button type="submit" className="bg-gray-100 text-gray-900 font-semibold px-8 py-2 rounded-lg hover:bg-gray-200 transition">
                  Send
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DashboardTransferMoney;