import React from 'react'
import { useContext } from 'react'
import notesContext from '../context/notes/NoteContext'

const DeleteModal = () => {
    const noteContext = useContext(notesContext);
    const { dltModalRef, dltModal, handleClickOnDltNote } = noteContext;
    return (
        <>
            <button ref={dltModalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-break me-2" id="exampleModalLabel">{dltModal.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body h6">
                            <i className="fa-solid fa-triangle-exclamation me-2 text-danger"></i>
                            Are you sure you want to permanently delete this note?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleClickOnDltNote} >Yes</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal