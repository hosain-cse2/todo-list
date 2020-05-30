export const get = async () => {
  const response = await fetch("http://localhost:3001/todolist", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const post = async (payload) => {
  const response = await fetch("http://localhost:3001/todolist", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
};

export const del = async (todoItem) => {
  const response = await fetch("http://localhost:3001/todolist", {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoItem),
  });
  const data = await response.json();
  return data;
};

export const update = async (todoItem) => {
  const response = await fetch("http://localhost:3001/todolist", {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoItem),
  });
  const data = await response.json();
  console.log("data: ", data);
  return data;
};
