import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import { toast } from "react-hot-toast";
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert]= useState({
    show: false,
    data: null
  })    
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //get all Expense details
  const fetchExpenseDetails = async () => {
    if(loading) return;
    setLoading(true);

    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

      if(response){
        setExpenseData(response.data);
      }
    }catch(error){
      console.error("Error fetching Expense:", error.response?.data || error.message);
    }
    finally{
          setLoading(false);
        }
    }

  //Handle add Expense
  const handleAddExpense = async (Expense) => {
    const {category, amount, date, icon} = Expense;
    //validation checks
    if(!category.trim()){
      toast.error("category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid greater than 0");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {category, amount, date, icon});
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully")
      fetchExpenseDetails();
    }catch(error){
      console.error("Error adding Expense", error.response?.data?.message || error.message);
    } 
  }

    const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({
        show:false,
        data: null,
      });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error(
        "Error deleting Expense",
        error?.response?.data?.message || error.message);
    }
  };

  //Handle download expense
  const handleDownloadExpense = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });
    //create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch (error){
      console.error("Error downloading expense details", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  }

    useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Expense">
        <div className="expense-page">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpense}
            />
        </div>
        
        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </ Modal> 

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </ Modal>
      </DashboardLayout>
  )
}

export default Expense
