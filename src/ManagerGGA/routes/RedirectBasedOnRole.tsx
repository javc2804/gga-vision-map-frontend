import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RedirectBasedOnRole = () => {
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setRedirectTo("/");
    } else if (role === "store") {
      setRedirectTo("/note-invoices-list");
    } else {
      setRedirectTo("/login");
    }
  }, []);

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  // Mientras se decide la redirección, puedes retornar null o un componente de carga
  return null;
};

export default RedirectBasedOnRole;
