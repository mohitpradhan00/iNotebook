import React, { useContext, useState } from 'react';
import notesContext from '../context/notes/NoteContext';
import alertContext from '../context/alerts/AlertContext';

const AddNote = () => {
    const noteContext = useContext(notesContext);
    const { addNote } = noteContext;
    const altContext = useContext(alertContext);
    const { setLoadingProgress, showAlert } = altContext;

    const [note, setNote] = useState({ title: "", description: "", tag: "General" })

    const handleClickOnAddNote = (e) => {
        e.preventDefault();
        setLoadingProgress(20);
        addNote(note.title, note.description, note.tag);
        setLoadingProgress(70);
        showAlert(`"${note.title}" added successfully.`, "primary");
        setNote({ title: "", description: "", tag: "General" });
        setLoadingProgress(100);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form onSubmit={handleClickOnAddNote}>
                <div>
                    <label htmlFor="title" className="form-label col-form-label-lg d-none">Title</label>
                    <input type="text" className="form-control form-control-lg title" id="title" name='title' aria-describedby="emailHelp" placeholder='Title' value={note.title} onChange={onChange} minLength={2} maxLength={120} required />
                </div>
                <hr style={{ marginBlock: "0" }} />
                <div className="mb-2">
                    {/* <label htmlFor="description" className="form-label col-form-label-lg d-none">Description</label> */}
                    <textarea type="text" className="form-control description" id="description" name='description' placeholder='Description' value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="input-group my-3">
                    <label htmlFor="tag" className="input-group-text">Tag</label>
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='tag' value={note.tag} onChange={onChange}>
                        <option value="General">General</option>
                        <option value="Personal">Personal</option>
                        <option value="Important">Important</option>
                        <option value="Quote">Quote</option>
                        <option value="Study">Study</option>
                        <option value="Project">Project</option>
                        <option value="Event">Event</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Statement">Statement</option>
                        <option value="Confused">Confused</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={note.description.length < 5} >Save</button>
            </form>
        </div>
    )
}

export default AddNote