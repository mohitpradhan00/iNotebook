import React from 'react'
import { useContext } from 'react';
import notesContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const noteContext = useContext(notesContext);
    const { tagColorChange, viewNoteModal } = noteContext;
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card m-2 overflow-hidden position-relative" onClick={() => { viewNoteModal(note) }}>
                <span className="badge NoteItemBadge" style={{ background: tagColorChange(note.tag) }}>
                    {note.tag}
                </span>
                <div className="card-body" style={{ height: "250px" }}>
                    <div className="d-flex justify-content-between mb-1">
                        <h5 className="card-title text-break pt-1">{note.title}</h5>
                    </div>
                    <p className="card-text" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem