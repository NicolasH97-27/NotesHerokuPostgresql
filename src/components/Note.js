const Note = ({ note }) => {
  
    return  (
    <li className="note">
    <span>{note.content}</span> 
    
  </li>)
  
  }
export default Note;