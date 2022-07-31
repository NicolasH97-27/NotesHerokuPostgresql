
//que piola esta usestate!
import { useState, useEffect, useRef } from 'react'

import "./index.css";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
import Button from "./components/Button";
import Notification from "./components/Notification";
import ToggleSwitch from "./components/ToggleSwitch";
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import noteService from './services/notes'
import loginService from './services/login'


const App = () => {
  const [notes, setNotes] = useState([]) //se declara un valor y un estado(una funcion segun entiendo)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('escribi tranquilo...')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }


  useEffect(hook,[]) 
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' cambio su importancia`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  
  const noteFormRef = useRef()
  return (
    <body>
      <div >
        <Navbar />
      </div>
      
      <Notification  message={errorMessage} />

      
      {user === null ?
        <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable> :
        <div>
        <p className='inicio'>{user.name} logged in</p>
        <Togglable buttonLabel="new note" ref={noteFormRef}>
          <NoteForm createNote={addNote} />
        </Togglable>
      </div>
      }

      {/* PUEDO SACAR ESTO Y PONERLO EN OTRO COMPONENTE ? LOS FORMULARIOS */}
      <ToggleSwitch
          accion={() => setShowAll(!showAll)}
          colorOff="gray"
          colorOn="black"
      />
     
      <ul className="Notas">
        
        {notesToShow.map(note => 
          <div>
            <Note 
              key={note.id} 
              note={note} 
              />
            <Button
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          </div>
        )}
      </ul>
      
             
    </body>
  );
};

export default App
