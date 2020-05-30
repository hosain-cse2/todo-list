import React from "react";
import TodoList from "./components/TodoList";
import styles from "./app.scss";

const App = () => {
  return (
    <div className={styles.main}>
      <TodoList />
    </div>
  );
};

export default App;
