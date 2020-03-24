import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListMain.css";
import NotesContext from "../NotesContext";

export default function NoteListMain(props) {
  return (
    <NotesContext.Consumer>
      {context => (
        <section className="NoteListMain">
          <ul>
            {context.notes
              .filter(
                note =>
                  note.folder_id === parseInt(props.match.params.folderId) ||
                  props.match.path === "/"
              )
              .map(note => (
                <li key={note.id}>
                  <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                  />
                </li>
              ))}
          </ul>
          <div className="NoteListMain__button-container">
            <CircleButton
              tag={Link}
              to="/add-note"
              type="button"
              className="NoteListMain__add-note-button"
            >
              +
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      )}
    </NotesContext.Consumer>
  );
}

NoteListMain.defaultProps = {
  notes: []
};
