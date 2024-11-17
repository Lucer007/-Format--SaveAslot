import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

import CrossIcon from "/cross.svg";
import "./loginCard.css";

const LoginCard = ({
  displayStatus,
  setDisplayStatus,
  cardFunction,
  setCardFunction,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardFunction === "register") {
      try {
        // Create a new user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        // Set user profile in Firestore database
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: user.email,
          });
        }

        console.log("User Successfully Registered");

        // Redirect to home page after successful login
        window.location.replace("/dashboard");
      } catch (err) {
        // Show error message to the user
        console.log(err.code);
        console.log(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        // Redirect to home page after successful login
        window.location.replace("/dashboard");

        console.log("User Successfully Logged In");
      } catch (err) {
        // Show error message to the user
        console.log(err.code);
        console.log(err.message);
      }
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleToggle = () => {
    setCardFunction(cardFunction === "register" ? "sign_in" : "register");
  };

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" form_container">
      <form onSubmit={preventRefresh} className="form_content">
        {cardFunction === "register" ? (
          <div className="form_title">
            <img
              src={CrossIcon}
              alt="cross icon"
              onClick={() => {
                setDisplayStatus(!displayStatus);
              }}
            />

            <h3>Register</h3>
          </div>
        ) : (
          <div className="form_title">
            <img
              src={CrossIcon}
              alt="cross icon"
              onClick={() => {
                setDisplayStatus(!displayStatus);
              }}
            />

            <h3>Sign In</h3>
          </div>
        )}

        <div
          className={
            cardFunction === "register" ? "form_input" : "hidden_form_label"
          }
        >
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name..."
          />
        </div>

        <div
          className={
            cardFunction === "register" ? "form_input" : "hidden_form_label"
          }
        >
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name..."
          />
        </div>

        <div className="form_input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
          />
        </div>

        <div className="form_input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
        </div>

        {cardFunction === "register" ? (
          <div className="form_submit">
            <button
              className="on_click_button"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
            <br />
            <button className="change_form_type" onClick={handleToggle}>
              Have an account, <br /> Login Here...
            </button>
          </div>
        ) : (
          <div className="form_submit">
            <button
              className="on_click_button"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
            <br />
            <button className="change_form_type" onClick={handleToggle}>
              Don&apos;t have an account, <br /> Register Here...
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

LoginCard.propTypes = {
  displayStatus: PropTypes.bool.isRequired,
  setDisplayStatus: PropTypes.func.isRequired,
  cardFunction: PropTypes.string.isRequired,
  setCardFunction: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  setFirstName: PropTypes.func,
  lastName: PropTypes.string,
  setLastName: PropTypes.func,
};

export default LoginCard;
