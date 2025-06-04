import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from "react";
import NoteCard from "./components/noteCard";
import API from "./api";
import Auth from "./pages/auth";

import './components/noteCard.css';
// import './App.css'; // Add your global or layout styles here if needed

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, SetSearchQuery] = useState("");
  const [counter, setCounter] = useState(3);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await API.get('/notes');
        setIsLoggedIn(true);
        setNotes(res.data);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setShowAuth(true);
      }, 3000);
      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isLoggedIn]);

  async function fetchNotes() {
    try {
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (error) {
      alert('failed to load notes');
    }
  }

  async function handleAddNote() {
    try {
      await API.post('/notes', { title, content });
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      setIsLoggedIn(false);
      setNotes([]);
    } catch {
      alert('logout failed');
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch {
      alert('failed to delete the note');
    }
  }

  const handleUpdate = async (id, editedTitle, editedText) => {
    try {
      await API.put(`/notes/${id}`, {
        title: editedTitle,
        content: editedText
      });
      fetchNotes();
    } catch {
      console.log("updation of note failed");
    }
  }

  const filteredNotes = searchQuery.trim() === ""
    ? notes
    : notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

  if (!isLoggedIn && !showAuth) {
    return (
      <>
        <h2>You are not logged in</h2>
        <p>You will be redirected to the login page in {counter} second{counter !== 1 ? "s" : ""}...</p>
      </>
    );
  }

  if (!isLoggedIn && showAuth) {
    return (
      <Auth onLogin={() => {
        setIsLoggedIn(true);
        fetchNotes();
      }} />
    );
  }

  return (
    <>
      <div className="main">

        <div className="mainChild1">
          <div className="add-logout-wrapper">
            <button className='addBtn' onClick={() => setShowForm(!showForm)}>
              <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
            </button>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
          </div>

          {showForm ?
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddNote();
            }}>
              <input type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input type="text"
                name="text"
                placeholder="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit">Add Note</button>
            </form> : <p>"click on the + to add a new note"</p>}
        </div>

        <div className="mainChild2">
          <input className="searchBar" type="text" placeholder="Search"
            value={searchQuery}
            onChange={(e) => SetSearchQuery(e.target.value)} />

          <div className="divyansh">
            <h1 className="">Divyansh Notes App</h1>
          </div>

          <NoteCard notes={filteredNotes} DeleteCard={handleDelete} updateNote={handleUpdate} />
        </div>
      </div>
    </>
  );
}

export default App;
