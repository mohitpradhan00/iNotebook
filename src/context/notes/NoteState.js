import { useState, useRef } from "react";
import NoteContext from "./NoteContext";
import { useContext } from "react";
import alertContext from "../alerts/AlertContext";

const NoteState = (props) => {
  const host = "https://inotebook-backend-6xao.onrender.com";
  const notesInitial = [];

  const altContext = useContext(alertContext);
  const { setLoadingProgress, showAlert } = altContext;

  const [notes, setNotes] = useState(notesInitial);
  const [dltModal, setDltModal] = useState({ id: "", title: "" })
  const [noteEditable, setNoteEditable] = useState(false)
  const [editedNote, setEditedNote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" })

  const viewRef = useRef();
  const viewCloseRef = useRef();
  const dltModalRef = useRef();

  //// Get all Notes
  const fetchAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //// Add a Note
  const addNote = async (title, description, tag) => {
    //// API Call
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    const note = {
      _id: newNote._id,
      title: title,
      description: description,
      tag: tag,
    }
    setNotes(notes.concat(note));
  }

  //// Edit a Note
  const editNote = async (id, title, description, tag) => {
    //// API Call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    await response.json();
    //// Logic to edit in Client
    let afterEditNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = afterEditNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(afterEditNotes)
  }

  //// Delete a Note
  const dltNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  //// Selecting color for note tag
  const tagColorChange = (tag) => {
    const colorPalette = {
      "General": "#6c757d",
      "Personal": "#82c341",
      "Important": "#ff5b6f",
      "Quote": "#a78768",
      "Study": "#b25fbd",
      "Project": "#ff9900",
      "Event": "#9d3f49",
      "Celebration": "linear-gradient(to right, #ff5b6f, #ff9900)",
      "Statement": "#212529",
      "Confused": "#75b06a"
    }
    return colorPalette[tag];
  }

  //// changing notes value from input
  const onChangeEditedNote = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
  }

  //// open big-screen modal for viewing Note
  const viewNoteModal = (currentNote) => {
    viewRef.current.click();
    setEditedNote({ id: currentNote._id, eTitle: currentNote.title, eDescription: currentNote.description, eTag: currentNote.tag });
  }

  //// open delete modal for confirmation
  const openDltModal = (currentNote) => {
    setDltModal({ id: currentNote.id, title: currentNote.title })
    dltModalRef.current.click();
  }

  //// handling delete button of dlt modal
  const handleClickOnDltNote = (e) => {
    e.preventDefault();
    setNoteEditable(false);
    viewCloseRef.current.click();
    setLoadingProgress(20);
    dltNote(dltModal.id)
    dltModalRef.current.click();
    showAlert("Your note has been deleted successfully.", "primary")
    setLoadingProgress(100);
  }

  //// handling save button after note was edited
  const handleClickOnUpdateNote = (e) => {
    e.preventDefault();
    setLoadingProgress(20);
    editNote(editedNote.id, editedNote.eTitle, editedNote.eDescription, editedNote.eTag);
    showAlert(`"${editedNote.eTitle}" has been updated Successfully.`, "primary")
    setNoteEditable(false)
    setLoadingProgress(100);
  }
  return (
    <NoteContext.Provider value={{ host, notes, viewRef, viewCloseRef, dltModalRef, fetchAllNotes, tagColorChange, viewNoteModal, addNote, onChangeEditedNote, editedNote, dltModal, handleClickOnUpdateNote, handleClickOnDltNote, openDltModal, noteEditable, setNoteEditable }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;