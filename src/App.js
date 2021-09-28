import { useState } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend' },
    { id: 2, title: 'I love u 3000' },
    { id: 3, title: 'A thousand year' },
  ]);

  function handleTodoClick(todo) {
    // console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    console.log(formValue);
    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>ReactJS Hook Basic</h1>
      <ColorBox />

      <h1>ReactJS Hook Todolist</h1>
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />

      <h1>ReactJS Hook TodoForm</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />

    </div>
  );
}

export default App;
