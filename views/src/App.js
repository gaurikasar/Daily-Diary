/** @format */

import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  const user = localStorage.getItem("token");

  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={user ? <Main user={user} /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
