import PropTypes from "prop-types";
import { auth } from "../../firebase/firebase";
import Logo from "/logo.png";
import Login from "../../login/Login";
import { useState } from "react";

import "./navbar.css";

const Navbar = ({ userDetails, setUserDetails }) => {
  const [displayStatus, setDisplayStatus] = useState(false);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      window.location.replace("/");
      console.log("User logged");
      setDisplayStatus(false);
      setUserDetails(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div className="navbar_container">
      <div className="navbar_logo">
        <img src={Logo} alt="SaveASlot logo" />
        <h3>SaveASlot</h3>
      </div>

      {window.location.pathname === "/" || !userDetails ? (
        <Login
          displayStatus={displayStatus}
          setDisplayStatus={setDisplayStatus}
        />
      ) : (
        <h3 onClick={handleLogOut}>Logout</h3>
      )}
    </div>
  );
};

Navbar.propTypes = {
  userDetails: PropTypes.object,
  setUserDetails: PropTypes.func,
};

export default Navbar;
