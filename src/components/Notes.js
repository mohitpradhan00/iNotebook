import React, { useContext, useEffect } from 'react';
import notesContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';

const Notes = () => {
    const noteContext = useContext(notesContext);
    const { notes, fetchAllNotes } = noteContext;

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchAllNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {/* Note Adding Section */}
            <AddNote />

            {/* Modal section */}
            <ViewModal />
            <DeleteModal />

            {/* Notes Section */}
            {localStorage.getItem('token') && <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && <h3 className='container d-flex justify-content-center my-2 text-muted'>No Notes to Display</h3>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>}
        </>
    )
}

export default Notes