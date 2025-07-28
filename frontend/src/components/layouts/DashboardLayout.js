import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import '../../styles/DashboardLayout.css';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) return null; // Or show spinner

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex-container">
          <div className="hide-on-small">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow-margin">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
