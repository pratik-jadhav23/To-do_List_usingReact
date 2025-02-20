import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Todo, setTodo] = useState("")
  // localStorage.clear()
  let todoString = localStorage.getItem("Todos")
  let todosString = []
  if (todoString) {
    todosString = JSON.parse(localStorage.getItem("Todos"))
  }
  const [Todos, setTodos] = useState(todosString)
  const [showFinished, setshowFinished] = useState(false)


  const saveToLS = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  useEffect(() => {
    console.log('Todos = ', Todos);
    saveToLS()  	
  }, [Todos])


  const updateTodo = (e) => {
    setTodo(e.target.value)
  }

  const saveTodo = (e) => {
    setTodos([...Todos, { id: uuidv4(), Todo, iscompleted: false }])
    setTodo("")
  }

  const handleCheckbox = (e, index) => {
    let newTodos = [...Todos]
    newTodos[index].iscompleted ? newTodos[index].iscompleted = false : newTodos[index].iscompleted = true
    // newTodos.map(item => {
    //   if (item.id === e.target.name) item.iscompleted ? item.iscompleted = false : item.iscompleted = true
    // })
    setTodos(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
  }

  const handleEdit = (e, id) => {
    let t = Todos.filter(i => i.id === id)
    setTodo(t[0].Todo)
    let newTodos = Todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
  }

  const toggleFinished = (e) => {
    // showFinished? setshowFinished(false):setshowFinished(true)
    setshowFinished(!showFinished)
  }

  return (
    <div className='flex flex-col items-center lg:gap-6 bg-indigo-200 min-h-screen'>
      <Navbar />
      <div className="container lg:w-2/5 lg:my-5 gap-2 flex flex-col lg:min-h-[80vh] rounded-xl bg-indigo-300 px-2">
        <div className=''><h1 className='font-bold text-center text-3xl'>iTask - Manage Your todos at one place</h1></div>
        <div className='font-bold'><h2>Add a Todo</h2></div>
        <div className='flex flex-col gap-2'>
          <div className='  flex justify-around'>
            <div className='w-4/5 '><input className='w-full h-full rounded-lg p-1' type="text" placeholder='type something' name='' value={Todo} onChange={updateTodo} /></div>
            <div>
              <button className='bg-violet-800 p-1 rounded-lg text-white hover:bg-violet-900 disabled:bg-violet-500' onClick={saveTodo} disabled={Todo.length <= 0}>Save</button>
            </div>
          </div>
          <div><input type="checkbox" name="" id="" checked={showFinished} onChange={toggleFinished}/>show Finished</div>
        </div>
        <div className=''><h2 className='font-bold'>Your Todos</h2>
          <div>{Todos.length === 0 && <div className='m-5'>No todos to display</div>}</div>
          {Todos.map((item, index) => {
            return (showFinished || !item.iscompleted) && <div key={item.id} className='flex justify-between mb-2'>
                <div className='w-3/4 flex gap-1'>
                  <div><input type="checkbox" name={item.id} id="" checked={item.iscompleted} onChange={(event) => handleCheckbox(event, index)} /></div>
                  <div className={item.iscompleted ? "line-through" : ""}>{item.Todo}</div>
                </div>
                <div className='flex gap-2 '>
                  <div><button className='bg-violet-800 p-1 rounded-lg text-white' onClick={(e) => handleEdit(e, item.id)}>edit</button></div>
                  <div>
                    <button className='bg-violet-800 p-1 rounded-lg text-white' onClick={(e) => handleDelete(e, item.id)}>delete</button>
                  </div>
                </div>
              </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
