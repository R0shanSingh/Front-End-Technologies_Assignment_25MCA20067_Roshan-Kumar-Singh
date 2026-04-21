import { useState } from 'react'

function App() {
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const handleAdd = () => {
    if(note.trim() === "") return

    if(editIndex !== null) {
      const updatedNotes = [...notes]
      updatedNotes[editIndex] = note
      setNotes(updatedNotes)
      setEditIndex(null)
    } 
    else{
      setNotes([...notes, note])
    }

    setNote("")
  }

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index)
    setNotes(updatedNotes)
  }

  const handleEdit = (index) => {
    setNote(notes[index])
    setEditIndex(index)
  }

  return (
    <>
      <h1>Note-App</h1>

      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Enter note" /><br /><br />

      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <hr />

      <h2>Notes List</h2>

      {notes.length === 0 && <p>No notes yet</p>}

      <ul>
        {notes.map((n, index) => (
          <li key={index}>
            {n}
            <br />
            <button onClick={() => handleEdit(index)}>Update</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <br /><br />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App