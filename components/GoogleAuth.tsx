import React from "react";
import { GoogleLogin } from "@react-oauth/google";

import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { addUser } = useAuthStore();

  return (
    <GoogleLogin
      onSuccess={(response) => createOrGetUser(response, addUser)}
      onError={() => console.log("error")}
    />
  );
};

export default Navbar;
