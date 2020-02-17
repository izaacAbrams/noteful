import React from "react";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import NotesContext from "../NotesContext";

export default function NotePageNav(props) {
  return (
    <NotesContext.Consumer>
      {context => (
        <div className="NotePageNav">
          <CircleButton
            tag="button"
            role="link"
            onClick={() => props.history.goBack()}
            className="NotePageNav__back-button"
          >
            <br />
            Back
          </CircleButton>
          {context.folder && (
            <h3 className="NotePageNav__folder-name">{context.folder.name}</h3>
          )}
        </div>
      )}
    </NotesContext.Consumer>
  );
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
};
