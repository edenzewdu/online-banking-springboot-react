import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarDashboard from './NavbarDashboard.jsx';
import axios from "../Utills/AxiosWithJWT.jsx";
import { useBankingSystem } from '../Context/UserContext.jsx';
import { ArrowUpTrayIcon, BanknotesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const DashBoardBalance = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, gettingAUser } = useBankingSystem();
  const [balance, setBalance] = useState(0);

  let accountNo = 0;
  let userName = null;

  try {
    userName = `${userDetails.firstname} ${userDetails.lastname}`;
    accountNo = userDetails.accounts[0].accountno;
  } catch {}

  const checkbal = async () => {
    gettingAUser();
    while (accountNo === 0) {
      accountNo = userDetails?.accounts[0]?.accountno;
    }

    try {
      const resp = await axios.get(`${BASE_URL}/account/checkbal/${accountNo}`);
      setBalance(resp?.data[0]?.balance);
    } catch (error) {
      console.log(error);
      if (userDetails?.accounts === undefined) navigateTo("/dashboard");
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
    checkbal();
  }, []);

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

          {/* Balance Section */}
          <div className="flex-1 bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Available Balance</h2>
            <div className="flex flex-col gap-4 text-lg md:text-xl">
              <div><span className="font-semibold">Name:</span> {userName || 'Loading...'}</div>
              <div><span className="font-semibold">Account No:</span> {accountNo || 'Loading...'}</div>
              <div><span className="font-semibold">Balance:</span> {balance}Br</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DashBoardBalance;
