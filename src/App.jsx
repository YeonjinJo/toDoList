import { useState } from "react";
import uuid from 'react-uuid'
import "./App.css";

function ToDo(props) {
  return (
    <div>
      <h3>Title : {props.todo.title}</h3>
      <p>content : {props.todo.content}</p>
      <button onClick={() => props.check(props.todo.id)}>
        {props.todo.isDone ? "Cancel" : "Complete"}
      </button>
      <button onClick={() => props.modify(props.todo.id)}>Modify</button>
      <button onClick={() => props.remove(props.todo.id)}>Remove</button>
    </div>
  );
}

function App() {
  const [todo, setTodo] = useState([]);
  const [idNumber, setIdNumber] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modifiedTitle, setModifiedTitle] = useState("");
  const [modifiedContent, setModifiedContent] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const addHandler = () => {
    if (title === "" || content === "") {
      alert("Empty!");
    } else {
      const newToDo = {
        id: uuid(),
        title,
        content,
        isDone,
      };
      setTodo([...todo, newToDo]);
      setTitle("");
      setContent("");
    }
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

  const modifyModalOpen = (id) => {
    setIdNumber(id);
    setModalOpen(true);
  };

  const modifyHandler = (id) => {
    if (modifiedTitle === "" || modifiedContent === "") {
      alert("Nothing is modified! Try again.");
      setModalOpen(true);
    } else {
      todo.forEach((arr, index) => {
        if (arr.id === id) {
          todo.splice(index, 1);
          const newToDo = {
            id: arr.id,
            title: modifiedTitle,
            content: modifiedContent,
            isDone,
          };
          setTodo([...todo, newToDo]);
          setModifiedTitle("");
          setModifiedContent("");
          alert("Modified!");
        }
      });
      setModalOpen(false);
    }
  };

  return (
    <div className="first">
      <h1>Yeonjin's React Basic Practice</h1>
      <div className="second">
        <input
          value={title}
          placeholder="Insert your To Do title."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          value={content}
          placeholder="Insert your To Do content."
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            setIsDone(event.target.value);
            addHandler();
          }}
        >
          Add new To Do
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
                check={checkHandler}
                modify={modifyModalOpen}
                remove={removeHandler}
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
                check={checkHandler}
                modify={modifyModalOpen}
                remove={removeHandler}
              />
            ) : (
              <p className="emptyRegion" key={index.id}></p>
            );
          })}
        </div>
      </div>

      {modalOpen && (
        <div className="modalContainer">
          <div className="modalContent">
            <input
              value={modifiedTitle}
              placeholder="Modify your To Do title."
              onChange={(event) => {
                setModifiedTitle(event.target.value);
              }}
            />
            <input
              value={modifiedContent}
              placeholder="Modify your To Do content."
              onChange={(event) => {
                setModifiedContent(event.target.value);
              }}
            />{" "}
            <button
              className="modalModifyButton"
              onClick={() => {
                modifyHandler(idNumber);
              }}
            >
              Modify
            </button>
            <button
              className="modalCloseButton"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
