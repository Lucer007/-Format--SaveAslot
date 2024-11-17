import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/landing_page/Main";
import Dashboard from "./components/dashboard/Main";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase/firebase";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
