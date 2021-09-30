import { useEffect, useState } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend' },
    { id: 2, title: 'I love u 3000' },
    { id: 3, title: 'A thousand year' },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        // console.log(responseJSON);

        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log('Failed to fetch post list', error.message);
      }
    }

    fetchPostList();
  }, []);

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

      <h1>ReactJS Hook Postlist</h1>
      <PostList posts={postList} />

    </div>
  );
}

export default App;
