import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotesContext from '../NotesContext';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        fetch('http://localhost:9090/notes')
        .then(res => {
            if(!res.ok){
                return res.json().then(err => {
                    throw err
                })
            }
            return res.json()
        })
        .then(data => this.setState({notes: data}))
        .catch(error => console.log(error))

        fetch('http://localhost:9090/folders')
        .then(res => {
            if(!res.ok){
                return res.json().then(err => {
                    throw err
                })
            }
            return res.json()
        })
        .then(data => this.setState({folders: data}))
        .catch(error => console.log(error))
    }
    handleDelete = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
    }
    renderNavRoutes() {    
        return (         
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>

        );
    }

    renderMainRoutes() {
        
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                {['/note/:noteId'].map(path => (
                <Route
                    exact
                    path={path}
                    key={path}
                    component={NotePageMain}
                />
                ))}
               
            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDelete
        }
        return (
            <NotesContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </NotesContext.Provider>
        );
    }
}

export default App;