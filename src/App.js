import React, { useState, useEffect } from 'react';
function App() {



  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  const [input, setInput] = useState({
    id: '',
    title: '',
    active: false,
    completed: false,
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const ramdomId = () => {
    return Math.random().toString(36).substring(7);
  }
  const addTodo = (e) => {
    e.preventDefault();
    if (!input.title) return;
    input.id = ramdomId();
    localStorage.setItem('todos', JSON.stringify([...todos, input]));
    loadLocalStorage();
    setInput({ title: '', active: false });
  };

  const loadLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }


  const updateTodo = (id, type, value) => {
    const newTodos = [...todos];
    if (type === 'all') {
      newTodos.find((todo) => todo.id === id).active = value;
    }
    if (type === 'active') {
      newTodos.find((todo) => todo.id === id).completed = value;
    }
    localStorage.setItem('todos', JSON.stringify(newTodos));

    loadLocalStorage();

  }

  const renderTodo = (data, type) => {

    return (
      <>
        <td>{data.title}</td>
        <td>
          <input
            type="checkbox"
            checked={type === 'all' ? data.active : data.completed}
            onChange={(e) => {
              updateTodo(
                data.id, type, e.target.checked
              );
            }}
          />
        </td>
        {type === 'completed' &&
          <td>
            <button className='btn btn-danger'
              onClick={() => {
                const newTodos = todos.filter(
                  (item) => item.id !== data.id
                );
                localStorage.setItem(
                  'todos',
                  JSON.stringify(newTodos)
                );
                loadLocalStorage();
              }}
            >
              Delete
            </button>
          </td>}

      </>
    );
  }
  return (
    <div className='container d-flex flex-column justify-content-center ' style={{ height: 80 + 'vh', width: 80 + '%' }} >
      <ul className="nav nav-pills mb-3 w-100" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>
        </li>
        <li className="nav-item" role="presentation" >
          <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Active</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
            Completed
          </button>
        </li>
      </ul>
      <div className="tab-content w-100" id="pills-tabContent">

        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
          <form onSubmit={addTodo} >
            <div className='d-flex'>
              <input className='form-control'
                value={input.title}
                onChange={(e) => setInput({ title: e.target.value })}
              />
              <button className='btn btn-primary' type="submit">Add</button>
            </div>

          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  {renderTodo(todo, 'all')}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade w-100" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
          <form onSubmit={addTodo} >
            <div className='d-flex'>
              <input className='form-control'
                value={input.title}
                onChange={(e) => setInput({ title: e.target.value, active: true })}
              />
              <button className='btn btn-primary' type="submit">Add</button>
            </div>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.filter((todo) => todo.active === true).map((todo) => (
                <tr key={todo.id}>
                  {renderTodo(todo, 'active')}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tab-pane fade w-100" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Completed</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.filter((todo) => todo.completed === true).map((todo) => (
                <tr key={todo.id}>
                  {renderTodo(todo, 'completed')}
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-content-end w-100'>
            {todos.filter((todo) => todo.completed === true).length > 0 &&
              <button className='btn btn-danger'
                onClick={() => {
                  const newTodos = todos.filter(
                    (item) => item.completed !== true
                  );
                  localStorage.setItem(
                    'todos',
                    JSON.stringify(newTodos)
                  );
                  loadLocalStorage();
                }}
              >
                Delete All
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
