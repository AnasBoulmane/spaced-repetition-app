import React, { useState } from 'react';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>What's the Plan for Today?</h1>

      {/* <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} /> */}
    </div>
  );
}

export default TodoList;
