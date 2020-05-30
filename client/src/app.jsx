import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import icons from "./components/assets/icons";
import styles from "./app.scss";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("session")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const authenticated = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    console.log(
      "localStorage.getItem('session'): ",
      localStorage.getItem("session")
    );
    const response = await fetch("http://localhost:3001/logout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: JSON.parse(localStorage.getItem("session")),
      }),
    });

    localStorage.removeItem("session");
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.main}>
      {!isLoggedIn ? (
        <Login onAuthenticated={authenticated} />
      ) : (
        <>
          <div className={styles.logout}>
            <img
              src={icons.logout}
              className={styles.graphic}
              title="Logout"
              onClick={logout}
            />
          </div>
          <TodoList />
        </>
      )}
    </div>
  );
};

export default App;
