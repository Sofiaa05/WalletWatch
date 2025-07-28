import React from 'react'
import {useState, useEffect} from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useUserAuth } from '../hooks/useUserAuth';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import HistoryList from '../components/HistoryList';

const History = () => {
    useUserAuth();
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    //fetching hisotory
    const fetchHistoryDetails = async () => {
        if(loading) return;
        setLoading(true);
        try{
            const response = await axiosInstance.get(API_PATHS.HISTORY.GET_HISTORY);

            if(response){
                setHistoryData(response.data);
            }
        }catch (error){
            console.error("Error fetching history:", error.response?.data || error.message)
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHistoryDetails();
        return () => {};
    }, [])
  return (
    <DashboardLayout activeMenu="History">
      <div className='income-page'>
          <HistoryList
            transactions={historyData}
          />
      </div>
    </DashboardLayout> 
  )
}

export default History
