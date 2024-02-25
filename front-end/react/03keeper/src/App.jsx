import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import CreateArea from "./components/CreateArea";
function App() {
  const [notes, setNotes] = useState([]);

  function deleteNote(id){
   setNotes(prevNote => {
    return prevNote.filter((noteItem, index) => {
      return index !== id;
    })
   })
  }

  function addNotes(newNote){
    setNotes(prevNote => {
      return [...prevNote, newNote];
    })
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNotes}/>
      {notes.map((note, index) => {
        return <Notes 
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
        />
      })}
      <Footer />
    </div>
  );
}

export default App;
