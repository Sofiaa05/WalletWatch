import React, { useState, useEffect } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import '../../styles/NavBar.css';
import logo from '../../assets/images/logo.png';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

// ✅ Automatically close popup on window resize if >= 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && openSideMenu) {
        setOpenSideMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [openSideMenu]);

  return (
    <div className="navbar">
      <button 
        className="menu-toggle"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="menu-icon" />
        ) : (
          <HiOutlineMenu className="menu-icon" />
        )}
      </button>

        <img src={logo} alt="Wallet Watch Logo" className="navbar-logo" />

      {openSideMenu && (
        <div className="side-menu-popup">
          <SideMenu
            activeMenu={activeMenu}
            className="popup-style"
            style={{
              position: 'fixed',
              top: '92px',
              left: 14,
              backgroundColor: '#f6ddea',
              zIndex: 40,
              width: '16rem',
              height: 'calc(100vh - 92px)',
              overflowY: 'auto',
              paddingTop: '1rem',
              paddingRight: '1rem',
              borderRight: '1px solid #e5e7eb',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
