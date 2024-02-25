import React, { useState } from "react";
function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    function handleChange(event){
        const {name, value} = event.target;
        setNote(prevNote => {
            return{
                ...prevNote,
                [name]: value,
            }
        })
    }
    function handleSubmit(event){
        props.onAdd(note);
        event.preventDefault();
        setNote({
            title: "",
            content: ""
        })
    }
  return (
    <div className="create-area">
      <form>
        <input className="input-box"
        onChange={handleChange}
        value={note.title}
        name="title" 
        placeholder="Title" 
        />

        <textarea className="text-area"
        onChange={handleChange}
        value={note.content} 
        name="content" 
        placeholder="Take a note..." 
        rows="3" />

        <button 
        className="btn"
        onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
