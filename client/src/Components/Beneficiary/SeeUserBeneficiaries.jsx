import React, { useState, useEffect } from 'react'; 
import { useBankingSystem } from '../Context/UserContext.jsx';
import axios from "../Utills/AxiosWithJWT.jsx";
import { toast } from 'react-hot-toast';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';

const SeeUserBeneficiaries = () => {
  const navigateTo = useNavigate();
  const [userBeneficiaries, setUserBeneficiaries] = useState([]);
  const [currentBeneficiary, setCurrentBeneficiary] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { BASE_URL, userDetails } = useBankingSystem();

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
    getUserBeneficiaries();
  }, [userDetails]);

  const getUserBeneficiaries = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/beneficiaries/user/${userDetails?.userId}`);
      setUserBeneficiaries(resp?.data || []);
    } catch (error) {
      toast.error("Error fetching beneficiaries");
    }
  };

  const handleDeleteBeneficiaries = async (beneId) => {
    try {
      const resp = await axios.delete(`${BASE_URL}/beneficiaries/deleteabn/${beneId}`);
      getUserBeneficiaries();
      if ([200, 201, 204].includes(resp.status)) toast.success("Beneficiary Deleted!");
      else toast.error("Error deleting beneficiary");
    } catch (error) {
      toast.error("Error deleting beneficiary");
    }
  };

  const handleUpdateBeneficiaryDetails = (e) => {
    const { name, value } = e.target;
    setCurrentBeneficiary({ ...currentBeneficiary, [name]: value });
  };

  const handleUpdateBeneficiary = async (e) => {
    e.preventDefault();
    const { beneficiaryid, beneaccountno, beneficiaryname, relation } = currentBeneficiary;
    try {
      const resp = await axios.put(`${BASE_URL}/beneficiaries/updateabn/${userDetails.userId}`, {
        beneficiaryid,
        beneaccountno,
        beneficiaryname,
        relation
      });
      if (resp.status === 200) {
        toast.success("Beneficiary Updated Successfully!");
        getUserBeneficiaries();
        setIsPopupOpen(false); // close after update
      } else {
        toast.error("Error updating beneficiary");
      }
    } catch (error) {
      toast.error("Error updating beneficiary");
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white p-4 relative">
      <div className="container mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => navigateTo("/dashboard/trx")}
          className="absolute top-4 left-4 text-gray-900 text-xl hover:text-indigo-400 transition"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 py-10">All Beneficiaries</h1>
        

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {["ID", "Account Number", "Name", "Relation", "Update", "Delete"].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-200"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {userBeneficiaries.length > 0 ? userBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.beneficiaryid} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-3">{beneficiary.beneficiaryid}</td>
                  <td className="px-4 py-3">{beneficiary.beneaccountno}</td>
                  <td className="px-4 py-3">{beneficiary.beneficiaryname}</td>
                  <td className="px-4 py-3">{beneficiary.relation}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setCurrentBeneficiary(beneficiary);
                        setIsPopupOpen(true);
                      }}
                      className="bg-green-600 hover:bg-green-500 text-gray-900 px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDeleteBeneficiaries(beneficiary.beneficiaryid)}
                      className="bg-red-600 hover:bg-red-500 text-gray-900 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No beneficiaries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Modal */}
      {currentBeneficiary && (
        <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal nested>
          {close => (
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg mx-auto mt-10 relative">
              <button
                className="absolute top-3 right-3 text-gray-900 text-2xl hover:text-indigo-400"
                onClick={() => setIsPopupOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-white text-center mb-4">Update Beneficiary</h2>
              <form className="flex flex-col gap-4" onSubmit={handleUpdateBeneficiary}>
                <input
                  type="number"
                  name="beneaccountno"
                  value={currentBeneficiary?.beneaccountno || ''}
                  onChange={handleUpdateBeneficiaryDetails}
                  placeholder="Account Number"
                  className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="text"
                  name="beneficiaryname"
                  value={currentBeneficiary?.beneficiaryname || ''}
                  onChange={handleUpdateBeneficiaryDetails}
                  placeholder="Beneficiary Name"
                  className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="text"
                  name="relation"
                  value={currentBeneficiary?.relation || ''}
                  onChange={handleUpdateBeneficiaryDetails}
                  placeholder="Relation"
                  className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-gray-900 font-semibold py-2 px-4 rounded"
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </Popup>
      )}
    </section>
  );
};

export default SeeUserBeneficiaries;
