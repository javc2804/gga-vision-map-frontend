import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyComponent from "../components/MyComponent";
import Login from "../auth/pages/Login";
import Register from "../auth/pages/register";

const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyComponent />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
