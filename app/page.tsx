"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "ramaramadevi279@gmail.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      router.push("/login");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1 className="login-title">Login</h1>

        <p className="login-subtitle">
          Login to view the product
        </p>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="yourmail@gmail.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setEmail(e.target.value)
}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setPassword(e.target.value)
}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}