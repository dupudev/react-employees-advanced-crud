///Components
import CurrentMonthStats from '../../components/Dashboard/CurrentMonthStats/CurrentMonthStats';
import PastMonthStats from '../../components/Dashboard/PastMonthStats/PastMonthStats';

///Hooks
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <CurrentMonthStats />
      <PastMonthStats />
    </>
  );
};

export default Dashboard;
