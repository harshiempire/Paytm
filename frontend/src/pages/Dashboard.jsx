import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Consider moving this to a separate API service file
const fetchUserDetails = async (token) => {
  const response = await axios.get("http://localhost:3000/api/v1/user/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

function Dashboard() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDetails = async () => {
        try {
          const data = await fetchUserDetails(token);
          setAmount(data.amount);
          setFirstname(data.firstname);
          setIsLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error("Failed to fetch user details", error);
          setIsLoading(false); // Ensure loading is set to false even if there's an error
          // Handle error appropriately
        }
      };
      userDetails();
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator or message
  }

  return (
    <div className="">
      <Appbar firstname={firstname} />
      <Balance value={amount} />
      <Users />
    </div>
  );
}

export default Dashboard;
