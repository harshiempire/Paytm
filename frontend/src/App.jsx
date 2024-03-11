import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ul className="m-5 border border-red-500">
                <li className="">/signup - The signup page</li>
                <li>/signin - The signin page</li>
                <li>
                  /dashboard - Balances and see other users on the platform
                </li>
                <li>/send - Send money to other users</li>
              </ul>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<div>send</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
