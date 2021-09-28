import react, { useState } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend' },
    { id: 2, title: 'I love u 3000' },
    { id: 3, title: 'A thousand year' },
  ]);

  return (
    <div className="app">
      <h1>ReactJS Hook Basic</h1>
      <ColorBox />
      <h1>ReactJS Hook Todolist</h1>
      <TodoList />
    </div>
  );
}

export default App;
