import { useState } from "react";
import "./App.css";

function ToDo(props) {
  return (
    <div>
      <h3>제목 : {props.todo.title}</h3>
      <p>내용 : {props.todo.content}</p>
      <button onClick={() => props.check(props.todo.id)}>
        {props.todo.isDone ? "취소하기" : "완료하기"}
      </button>
      <button onClick={() => props.remove(props.todo.id)}>삭제하기</button>
    </div>
  );
}

function App() {
  const [todo, setTodo] = useState([
    { id: 1, title: "예시 1", content: "예시 1", isDone: false },
    { id: 2, title: "예시 2", content: "예시 2", isDone: false },
    { id: 3, title: "예시 3", content: "예시 3", isDone: true },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);

  const addHandler = () => {
    const newToDo = {
      id: todo.length + 1,
      title,
      content,
      isDone,
    };
    setTodo([...todo, newToDo]);
  };
  const removeHandler = (id) => {
    const newList = todo.filter((index) => index.id !== id);
    setTodo(newList);
  };

  const checkHandler = (id) => {
    todo.forEach((arr, index) => {
      if (arr.id === id) {
        todo.splice(index, 1);
        const newToDo = {
          id: arr.id,
          title: arr.title,
          content: arr.content,
          isDone: arr.isDone ? false : true,
        };
        setTodo([...todo, newToDo]);
      }
    });
  };

  return (
    <div className="first">
      <h1>Yeonjin's React Basic Practice</h1>
      <div className="second">
        <input
          value={title}
          placeholder="제목을 입력해주세요."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          value={content}
          placeholder="내용을 입력해주세요."
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button onClick={addHandler}>
          추가하기
        </button>
      </div>
      <div className="third">
        <h2>On progress</h2>
        <div className="listBox">
          {todo.map((index) => {
            return index.isDone ? (
              <p className="emptyRegion" key={index.id}></p>
            ) : (
              <ToDo
                todo={index}
                key={index.id}
                remove={removeHandler}
                check={checkHandler}
              />
            );
          })}
        </div>
        <h2>Done</h2>
        <div className="listBox">
          {todo.map((index) => {
            return index.isDone ? (
              <ToDo
                todo={index}
                key={index.id}
                remove={removeHandler}
                check={checkHandler}
              />
            ) : (
              <p className="emptyRegion" key={index.id}></p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
