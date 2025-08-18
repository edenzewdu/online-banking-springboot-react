import React, { useEffect } from 'react';
import welcome from "../../assets/images/welcome.png";
import axios from "../Utills/AxiosWithJWT.jsx";
import { useBankingSystem } from '../Context/UserContext.jsx';
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom';
import { BanknotesIcon, ArrowUpTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const DashboardMain = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, setUser: setUserDetails, gettingAUser } = useBankingSystem();

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      navigateTo("/");
    }
    gettingAUser();
  }, []);

  let accountNo = 0;
  const role = userDetails?.role;
  if (role === "ADMIN") navigateTo("/admin/dashboard");

  if (userDetails?.accounts?.length > 0) {
    accountNo = userDetails?.accounts[0]?.accountno;
  }

  const handleAccountOpnReq = async (e) => {
    e.preventDefault();

    if (!userDetails?.userdetails?.fyda || !userDetails?.userdetails?.mobile || !userDetails?.userdetails?.gender) {
      toast.error("Please Update Profile First");
      return;
    }

    if (!userDetails?.accountopenningreq) {
      const reqResp = await axios.put(`${BASE_URL}/api/v1/user/acopreq/${userDetails?.userId}`);
      setUserDetails(reqResp.data);
      toast.success("Request Sent Successfully!");
    } else {
      toast.success("Already Requested For Account Opening!");
    }
  };

  if (!accountNo) {
  return (
    <section className="relative h-screen w-full bg-gradient-to-b from-white to-black">
      {/* Background Image */}
      <img 
        src={welcome} 
        alt="dashboard_welcome_image" 
        className="max-w-full max-h-full object-contain justify-center items-center mx-auto"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-center p-6 gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Account Opening
        </h2>
        <p className="text-lg md:text-xl text-white/80">
          Click below to apply for a new bank account
        </p>

        <button
          onClick={handleAccountOpnReq}
          className="flex items-center justify-center gap-3 text-white text-lg font-semibold px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-400 transition-all duration-300"
        >
          <BanknotesIcon className="w-6 h-6" />
          Apply for Account
        </button>
      </div>
    </section>
  );
} else {
    return (
      <section className='h-screen bg-gray-700 text-white pt-8'>
        <h2 className='text-2xl font-semibold text-center mb-8'>Dashboard</h2>

        <div className='flex flex-col md:flex-row justify-around items-center gap-8'>
          {/* Operations */}
          <div className='flex flex-col items-center gap-4'>
            <h3 className='text-xl font-semibold'>Operations</h3>

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

          {/* Congratulation */}
          <div className='text-center max-w-xl'>
            <h2 className='text-3xl font-bold'>Congratulations! Your bank account has been created.</h2>
          </div>
        </div>
      </section>
    );
  }
};

export default DashboardMain;
