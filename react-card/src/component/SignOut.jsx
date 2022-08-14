import { useEffect } from "react";

import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
function SignOut({ redirect }) {
  const { logOut } = useAuth();
  const Navigate = useNavigate();
  useEffect(() => {
    logOut();
    if (redirect) {
      Navigate(redirect);
    }
  }, []);
  return null;
}

export default SignOut;
