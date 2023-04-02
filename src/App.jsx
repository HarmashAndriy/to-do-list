import React, { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/images/Logo.png'
import blank from './assets/images/blank.png'


const App = () => {
  const [done, setDone] = useState(0)
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const changeInput = (e) => {
    setInput(e.target.value)
  }
  const checkTask = (id) => {
    const checkedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked
      }
      return task
    })
    const newTasks = []
    checkedTasks.forEach((task) => {
      if (task.checked) {
        newTasks.push(task)
      }
      else {
        newTasks.unshift(task)
      }
    })
    setTasks(newTasks)
  }
  const addTask = () => {
    if (input.length > 0) {
      const newTask = {
        id: Date.now(),
        title: input,
        checked: false
      }
      setTasks([...tasks, newTask])
      setInput('')
    }
    else {
      alert('Please select a task.')
    }
  }
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (tasks.length > 0) {
      setDone(tasks.reduce((acc, task) => {
        if (task.checked) {
          return acc + 1
        }
        return acc
      }, 0))
    }
    else{
      setDone(0)
    }
  }, [tasks])

  useEffect(() => {
    document.addEventListener('keydown', keyDown)
    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  })
  useEffect(() => {
    const newTasks = JSON.parse(localStorage.getItem('tasks'));
    if(newTasks){
      setTasks(newTasks)
    }
  }, [])
  const keyDown = (e) => {
    if (e.keyCode === 13) {
      addTask()
    }
  }
  return (
    <div>
      <nav>
        <div className='container'>
          <img src={logo} alt="" />
        </div>
      </nav>
      <div className='container'>
        <div className='adder'>
          <input type="text"
            placeholder='Add new quest... '
            onChange={(e) => changeInput(e)}
            value={input}
          />
          <button onClick={addTask}>Create<i className="bi bi-plus-circle"></i></button>
        </div>
        <div className="task_menu">
          <p className='all_tasks'>All Tasks <span className='plenty'>{tasks.length}</span></p>
          <p className='done'>Done <span className='plenty'>{done}</span></p>
        </div>
        {tasks.length === 0
          ? <div className="empty">
            <img src={blank} alt="" />
            <h3>You do not have any tasks registered yet</h3>
            <p>Create tasks and organize your things</p>
          </div>
          : <div className="tasks">
            {tasks.map((task) =>
              <div className='task' key={task.id}>
                <div className="round">
                  <input type="checkbox"
                    id={"checkbox" + task.id}
                    onClick={() => checkTask(task.id)}
                    name={task.id}
                    value={task.checked}
                  />
                  <label htmlFor={"checkbox" + task.id}></label>
                </div>
                <p className={task.checked ? 'checked' : ''}>{task.title}</p>
                <i className="bi bi-trash3" onClick={() => deleteTask(task.id)}></i>
              </div>
            )}
          </div>
        }
      </div>
    </div>

  );
};
export default App