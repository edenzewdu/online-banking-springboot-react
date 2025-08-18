import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard.jsx'
import axios from '../Utills/AxiosWithJWT.jsx'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext.jsx"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";                                         
import { ArrowUpTrayIcon, BanknotesIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
        




const DashBoardTransactions = () => {

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser, gettingAuser } = useBankingSystem();

    const [accno, setAccno] = useState(0);

    const [transactionDetails, setTransactionDetails] = useState();
    const [sizeOptions] = useState([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
 

    const setTransaction = (details => {
        console.log("Main phir bhi pagal hu!", details)
        setTransactionDetails(details);
    })

    try {
        if (accno == 0)
            setAccno(userDetails?.accounts[0]?.accountno);
    }
    catch (err) {
        console.log(err);

    }

    const getAllAccTransactions = async (e) => {
        // e.preventDefault();
        while (accno == 0) {
            console.log("im whilel loop");
            setAccno(userDetails?.accounts[0]?.accountno);
        }
        console.log("entry 1");
        try {
            console.log("entry 2");
            const resp = await axios.get(`${BASE_URL}/transactions/bankaccount/${accno}`);
            console.log("entry 3");
            console.log(resp);

            console.log("Data fetched Successfully");
            setTransaction(resp.data);

            console.log(transactionDetails);

            if (resp.status === 200) {

                toast.success("Here Is Your Transactions");
            }

            if (resp.data == null) {
                toast.success("No Transactions found !");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }

        } catch (error) {
            console.log(error);

            if (userDetails?.accounts === undefined) { navigateTo("/dashboard") }

            // toast.error("Invalid Credentials!")
        }

    }

    useEffect(() => {

        if (!sessionStorage.getItem("jwtToken")) {
            navigateTo("/")
        }

        getAllAccTransactions();

    }, []);



    const columns = [
        { dataField: "transactionId", text: "Tr_Id" },
        { dataField: "transactionDate", text: "Date", sort: true },
        { dataField: "transactionTime", text: "Time", sort: true },
   
    ]





    return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <NavbarDashboard />

      <section className="max-w-7xl mx-auto p-6 mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Transactions</h2>

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


                    <div className='w-max h-[80vh]'>
                        <div className="shadow-md sm:rounded-lg bg-white h-[60vh]">

                                            <div className="flex justify-center items-center py-4">
                                    <SelectButton value={size} onChange={(e) => setSize(e.value)} options={sizeOptions} />
                                </div>

                                <div className='px-4 pb-4'>
                                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                                    <InputText onInput={(e)=>{
                                        setFilters({global:{value: e.target.value, matchMode:FilterMatchMode.CONTAINS},})
                                    }}
                                    placeholder="Keyword Search"
                                    />
                                    </span>
                                </div>
        <DataTable value={transactionDetails}  paginator rows={5} rowsPerPageOptions={[5, 10]} stripedRows showGridlines size={size} sortMode="multiple" tableStyle={{ minWidth: '20rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" 
            filters={filters}
        >
                                    <Column field="transactionId" sortable header="Tr_ID" />
                                    <Column field="transactionDate" sortable header="Date" />
                                    <Column field="transactionTime" sortable header="Time" />
                                    <Column field="fromAccount" header="From Account" body={(rowData) => {
                                return <span className="text-center">{ rowData.fromAccount != accno ? rowData.fromAccount : rowData.toAccount}</span>;
                            }}></Column>
                                    <Column field="amount" header="Credit" body={(rowData) => {
                                return rowData.fromAccount === accno ? (
                                    <span className="text-right text-red-400 content-end">-</span>
                                ) : (
                                    <span className="text-right text-green-400 content-end">{rowData.amount} Br</span>
                                );
                            }}></Column>

                        <Column field="amount" header="Dedit" body={(rowData) => {
                                return rowData.fromAccount === accno ? (
                                    <span className="text-right text-red-400 content-end">-{rowData.amount} Br</span>
                                ) : (
                                    <span className="text-right text-green-400 content-end">-</span>
                                );
                            }}></Column>

                        <Column field="balance" header="Balance" body={transaction => (
                            <span className={`text-right content-end ${transaction.fromAccount == accno ? 'text-red-400' : 'text-green-400'}`}>
                            {transaction.fromAccount == accno ? transaction.senderBal : transaction.receiverBal} Br
                            </span>
                        )} /> 
                                <Column field="transactionStatus" header="Cr/Dt" body={(rowData) =>
                            rowData.transactionStatus !== "Completed" ?
                            <span className="text-red-400">Failed</span> :
                            rowData.fromAccount === accno ? "Dt" : "Cr"} />
                                <Column field="description" header="Description" /> 

                                <Column field="transactionStatus" header="Transaction Status" body={(rowData) =>
                            rowData.transactionStatus === 'Completed' ?
                            <span className="text-green-400">Completed</span> :
                            <span className="text-red-600">{rowData.transactionStatus}</span>
                                } />                                      
                                    </DataTable> 

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashBoardTransactions