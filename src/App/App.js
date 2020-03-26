import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotesContext from "../NotesContext";
import NotesError from "../NotesError";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    fetch("https://peaceful-retreat-36933.herokuapp.com/api/notes")
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw err;
          });
        }
        return res.json();
      })
      .then(data => this.setState({ notes: data }))
      .catch(error => console.log(error));

    fetch("https://peaceful-retreat-36933.herokuapp.com/api/folders")
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw err;
          });
        }
        return res.json();
      })
      .then(data => this.setState({ folders: data }))
      .catch(error => console.log(error));
  }
  handleDelete = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddFolder = title => {
    const folderName = title.name;
    const folder_id = title.id;
    this.setState({
      ...this.state.folders.push({
        name: folderName,
        id: folder_id
      })
    });
  };

  handleAddNote = note => {
    const { name, id, folder_id, content, modified } = note;
    this.setState({
      ...this.state.notes.push({
        name,
        id,
        folder_id,
        content,
        modified
      })
    });
  };
  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        {["/note/:noteId"].map(path => (
          <Route exact path={path} key={path} component={NotePageMain} />
        ))}
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDelete,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    };
    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <NotesError>
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
          </NotesError>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
            </h1>
          </header>
          <NotesError>
            <main className="App__main">{this.renderMainRoutes()}</main>
          </NotesError>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;
