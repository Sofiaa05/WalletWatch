import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/SideMenu.css'; 
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu, className = "", style = {} }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogOut();
      return;
    }
    navigate(route);
  };

  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className={`side-menu ${className}`} style={style}>
      <div className="profile">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
          />
        ) : (
            <CharAvatar 
                fullname={user?.fullname}
                width="4rem"
                height="4rem"
                style={{
                    fontSize: "1.25rem", 
                }}
            />
        )}
        <h5 className="profile-name">{user?.fullname || ""}</h5>
      </div>

     {SIDE_MENU_DATA.map((item, index) => (
  <button
    key={`menu_${index}`}
    className={`menu-button ${activeMenu === item.label ? 'active' : ''}`}
    onClick={() => handleClick(item.path)} 
  >
    <item.icon className="menu-icon" />
    {item.label}
  </button>
))}

    </div>
  );
};

export default SideMenu;
