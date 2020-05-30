import React, { useState, useEffect, useCallback } from "react";
import Table from "./Table";
import styles from "./todoList.scss";
import { get, post, del, update } from "../api";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const getTodoList = async () => {
      setTodoList(await get());
    };
    getTodoList();
  }, []);

  const AddTodoList = () => {
    const addTodoList = async (payload) => {
      setTodoList(await post(payload));
      setTitle("");
      setDescription("");
    };
    if (title && title.trim() && description && description.trim()) {
      addTodoList({ title: title, description: description });
    }
  };

  const onDeleteRow = useCallback(async (todoItem) => {
    setTodoList(await del(todoItem));
  }, []);

  const onEdit = useCallback(async (todoItem) => {
    setSelectedTodo(todoItem);
    setTitle(todoItem.title);
    setDescription(todoItem.description);
  }, []);

  const updateTodoList = async () => {
    if (title && title.trim() && description && description.trim()) {
      const updatedTodo = {
        id: selectedTodo.id,
        title: title,
        description: description,
      };
      setTodoList(await update(updatedTodo));
      setSelectedTodo(null);
      setTitle("");
      setDescription("");
    }
  };

  const clearTodo = () => {
    setSelectedTodo(null);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={`${styles.todoListInput} ${styles.todoListTitle}`}>
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div
          className={`${styles.todoListInput} ${styles.todoListDescription}`}
        >
          <p>Description</p>
          <textarea
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className={`${styles.todoListInput} ${styles.todoListAdd}`}>
          {!selectedTodo ? (
            <button className={styles.button} onClick={AddTodoList}>
              Add
            </button>
          ) : (
            <>
              <button className={styles.button} onClick={clearTodo}>
                Cancel
              </button>
              <button className={styles.button} onClick={updateTodoList}>
                Update
              </button>
            </>
          )}
        </div>
      </div>
      <Table data={todoList} onDelete={onDeleteRow} onEdit={onEdit} />
    </>
  );
};

export default TodoList;
