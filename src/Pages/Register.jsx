import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setfirst] = useState("");
  const [middle_name, setmiddle] = useState("");
  const [last_name, setlast] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        first_name,
        middle_name,
        last_name,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Registration failed", error.response?.data || error);
      setError("Registration failed. Please try again.");
    }
  };

  if (success) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Register</h2>

      {error && <p className="text-red-500">{error}</p>}

    
      <input
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setfirst(e.target.value)}
        className="border p-2 my-2 w-64"
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={middle_name}
        onChange={(e) => setmiddle(e.target.value)}
        className="border p-2 my-2 w-64"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setlast(e.target.value)}
        className="border p-2 my-2 w-64"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 my-2 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 my-2 w-64"
      />
  

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 mt-4 w-64"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
