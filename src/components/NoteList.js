import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../api/api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [searchOwner, setSearchOwner] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const searchNotes = async () => {
    if (searchOwner.trim() === "") {
      getNotes(); // If search is empty, reload all notes
      return;
    }
    try {
      const response = await api.get(`/notes/search/${searchOwner}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error searching notes:", error);
      setNotes([]); // Clear results if no matches found
    }
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:7000/notes/${id}`); // Change to your backend IP
      setNotes(notes.filter((note) => note.id !== id)); // Remove deleted note from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to="add" className="button is-success">Add New Note</Link>
        <div className="field mt-3">
          <label className="label">Search by Owner</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={searchOwner}
              onChange={(e) => setSearchOwner(e.target.value)}
              placeholder="Enter owner's name"
            />
          </div>
          <button onClick={searchNotes} className="button is-primary mt-2">
            Search
          </button>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.owner}</td>
                <td>
                  <Link to={`edit/${note.id}`} className="button is-small is-info mr-2">Edit</Link>
                  <button onClick={() => deleteNote(note.id)} className="button is-small is-danger">Delete</button>
                  <Link to={`detail/${note.id}`} className="button is-small is-primary ml-2">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteList;