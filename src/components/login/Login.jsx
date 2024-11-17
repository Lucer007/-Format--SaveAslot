import { useState } from "react";
import PropTypes from "prop-types";
import LoginCard from "./login_card/LoginCard";
import "./login.css";

const SignIn = ({ displayStatus, setDisplayStatus }) => {
  const [cardFunction, setCardFunction] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleOnClick = () => {
    setDisplayStatus(!displayStatus);
  };

  return (
    <div className="sign_in_container">
      <h3 onClick={handleOnClick}>Sign In</h3>
      {displayStatus ? (
        <LoginCard
          displayStatus={displayStatus}
          setDisplayStatus={setDisplayStatus}
          cardFunction={cardFunction}
          setCardFunction={setCardFunction}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
        />
      ) : (
        ""
      )}
    </div>
  );
};

SignIn.propTypes = {
  displayStatus: PropTypes.bool.isRequired,
  setDisplayStatus: PropTypes.func.isRequired,
};

export default SignIn;
