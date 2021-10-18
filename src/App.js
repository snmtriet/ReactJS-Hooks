import { useEffect, useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import queryString from "query-string";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend" },
    { id: 2, title: "I love u 3000" },
    { id: 3, title: "A thousand year" },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        // console.log(responseJSON);

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    // console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
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

  function handleFilterChange(newFilter) {
    console.log(newFilter);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

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

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      <PostFilterForm onSubmit={handleFilterChange} />

      <h1>ReactJS Clock</h1>
      {showClock && <Clock />}
      <button className="btnHideClock" onClick={() => setShowClock(false)}>
        Hide Clock
      </button>
      <button className="btnHideClock" onClick={() => setShowClock(true)}>
        Show Clock
      </button>
    </div>
  );
}

export default App;
