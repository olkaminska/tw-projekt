import React, { useEffect, useState } from "react";
import { AddAuthor } from "./components/AddAuthor";
import { AuthorsList } from "./components/AuthorList";
import "./styles.css";

const API_URL = "http://localhost:8000";

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [editedAuthor, setEditedAuthor] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const onDeleteAuthorClickHandler = (id) => {
    fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          setAuthors((prevAuthors) =>
            prevAuthors.filter((author) => author.id !== id)
          );
          if (editedAuthor && editedAuthor.id === id) {
            setEditedAuthor(null);
          }
        }
      })
      .catch((error) => {
        console.error("Error deleting author:", error);
      });
  };

  const onAddAuthorClickHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;

    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthors((prevAuthors) => [...prevAuthors, data]);
        }
      })
      .catch((error) => {
        console.error("Error adding author:", error);
      });
  };

  const onEditAuthorClickHandler = () => {
    fetch(`${API_URL}/authors/${editedAuthor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        surname: newSurname,
      }),
    })
      .then((res) => res.json())
      .then((updatedAuthor) => {
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) =>
            author.id === updatedAuthor.id ? updatedAuthor : author
          )
        );
        setEditedAuthor(null);
        setNewName("");
        setNewSurname("");
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating author:", error);
      });
  };

  const fetchAuthors = () => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });
  };

  const handleEditButtonClick = (author) => {
    setEditedAuthor(author);
    setNewName(author.name);
    setNewSurname(author.surname);
    setShowEditModal(true);
  };

  return (
    <div className="app">
      <div
        className="overlay"
        style={{ display: showEditModal ? "block" : "none" }}
      ></div>
      <div
        className="modal-container"
        style={{ display: showEditModal ? "flex" : "none" }}
      >
        <div className="edit-modal">
          <h2>Edit Author</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEditAuthorClickHandler();
            }}
          >
            <label htmlFor="edit-name">Name:</label>
            <input
              id="edit-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label htmlFor="edit-surname">Surname:</label>
            <input
              id="edit-surname"
              type="text"
              value={newSurname}
              onChange={(e) => setNewSurname(e.target.value)}
            />
            <div className="edit-modal-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
            <p className="edit-modal-message">
              Zamknij to okno i odśwież, żeby zobaczyć zmiany.
            </p>
          </form>
        </div>
      </div>
      <div className="add-author-container">
        <AddAuthor onAdd={onAddAuthorClickHandler} />
      </div>
      <AuthorsList
        authors={authors}
        onDelete={onDeleteAuthorClickHandler}
        onEdit={handleEditButtonClick}
      />
    </div>
  );
}
