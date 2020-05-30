import React, { useState } from "react";

import styles from "./login.scss";

const Login = ({ onAuthenticated }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async () => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    if (response && response.status === 200) {
      const data = await response.json();
      localStorage.setItem("session", JSON.stringify(data));
      onAuthenticated && onAuthenticated();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginInputContainer}>
        <div className={styles.inputCredential}>
          <p>User name</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.inputCredential}>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.loginButtonContainer}>
          <button className={styles.loginButton} onClick={authenticate}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
