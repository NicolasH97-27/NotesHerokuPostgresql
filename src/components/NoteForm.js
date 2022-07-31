//aca se aplica destructuring, es destruturar un objeto
import ToggleSwitch from "./ToggleSwitch";
import { useState } from 'react' 


const Form1 = (args) =>{
  const [newNote, setNewNote] = useState('') 
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }
  
  const addNote = (event) => {
    event.preventDefault()
    args.createNote({
      content: newNote,
      important: Math.random() > 0.5,
    })
    
    setNewNote('')
  }
    return(
    <form className="formDiv" onSubmit={addNote} action="#"  name="formNotas">
	      <label for="mensaje">Notas</label>
	      <textarea  value={args.value} onChange={handleChange} name="mensaje" for="mensaje" maxlength="300"></textarea>
        <input   type="submit" name="enviar" value="enviar notas"/>

      {/* <ToggleSwitch
          accion={() => args.accion}
          colorOff="gray"
          colorOn="black"
      /> */}
    </form>
    )
}
export default Form1;
