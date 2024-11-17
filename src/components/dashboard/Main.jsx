import { useState } from "react";

import Navbar from "../shared/navbar/Navbar";
import Hero from "./hero/Hero";

const Main = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <>
      <Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
      <Hero userDetails={userDetails} setUserDetails={setUserDetails} />
    </>
  );
};

export default Main;
