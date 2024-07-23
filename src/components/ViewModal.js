import React, { useContext, useRef } from 'react'
import notesContext from '../context/notes/NoteContext';

const ViewModal = () => {
    const noteContext = useContext(notesContext);
    const { viewRef, viewCloseRef, tagColorChange, editedNote, noteEditable, setNoteEditable, onChangeEditedNote, openDltModal, handleClickOnUpdateNote } = noteContext;
    const eTitleInputRef = useRef();
    return (
        <>
            <button ref={viewRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#viewModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="viewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="viewModal" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title d-flex" id="viewModalTitle">
                                <img style={{ width: "27px", height: "27px", borderRadius: "50%" }} src="https://w7.pngwing.com/pngs/739/481/png-transparent-note-taking-reading-writing-taking-miscellaneous-angle-text-thumbnail.png" alt="" />
                                <span className='text-info'>i</span>Notebook
                                {noteEditable ? <select className="form-select ms-2 py-0 rounded-pill d-flex align-items-center" id="eTag" aria-label="select updated tag" name='eTag' value={editedNote.eTag} onChange={onChangeEditedNote} >
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
                                </select> : <span className="badge rounded-pill ms-2 viewModalBadge d-flex align-items-center" style={{ background: tagColorChange(editedNote.eTag) }}>
                                    {editedNote.eTag}
                                </span>}
                            </h5>
                            <button type="button" className="btn-close" onClick={() => { setNoteEditable(false); }} ref={viewCloseRef} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mt-1 d-flex flex-column justify-content-center align-items-center">
                            <input type="text" ref={eTitleInputRef} className="form-control viewTitle" id="eTitle" name='eTitle' aria-describedby="emailHelp" value={editedNote.eTitle} minLength={2} maxLength={120} onChange={onChangeEditedNote} disabled={!noteEditable} />
                            <textarea type="text" className="p-2 viewDescription border border-1" id="viewDescription" name='eDescription' placeholder='Description' value={editedNote.eDescription} onChange={onChangeEditedNote} disabled={!noteEditable} />
                        </div>
                        <div className="modal-footer m-0 p-1">
                            <button type="button" className="btn btn-secondary viewModalDltBtn me-2" onClick={() => { openDltModal(editedNote) }}><i className="fa-solid fa-trash m-1"></i> Dlt</button>
                            {noteEditable ? <button type="button" className="btn btn-secondary viewModalEditBtn" onClick={handleClickOnUpdateNote} disabled={editedNote.eTitle.length < 2 || editedNote.eDescription.length < 5}><i className="fa-solid fa-pen-to-square m-1"></i> Save</button> : <button type="button" className="btn btn-secondary viewModalEditBtn px-3" onClick={() => {
                                setNoteEditable(true); setTimeout(() => {
                                    eTitleInputRef.current.focus();
                                }, 75);
                            }}><i className="fa-solid fa-pen-to-square m-1"></i> Edit</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewModal