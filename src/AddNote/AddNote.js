import React, { Component } from "react";
import NotesContext from "../NotesContext";
import { randomId } from "../notes-helpers";
import ValidationError from "../ValidationError";
import "./AddNote.css";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      id: "",
      folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      content: "",
      modified: ""
    };
  }

  static contextType = NotesContext;

  handleInput = e => {
    this.setState({
      name: {
        value: e.target.value,
        touched: true
      },
      id: randomId(),
      modified: new Date().toISOString()
    });
  };
  handleTextArea = e => {
    this.setState({
      content: e.target.value
    });
  };
  handleDropdown = e => {
    this.setState({
      folderId: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let input = {
      ...this.state,
      name: this.state.name.value
    };

    fetch("http://localhost:9090/notes", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.context.addNote(data);
      })
      .catch(err => {
        console.log("Error: ", err);
      });

    this.props.history.push("/");
  };
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Note Title is Required";
    }
  }
  componentDidMount() {
    this.setState({});
  }
  render() {
    const nameError = this.validateName();
    const folderOptions = this.context.folders.map(folder => {
      return (
        <option value={folder.id} key={folder.id}>
          {folder.name}
        </option>
      );
    });
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Note Title"
          onChange={e => this.handleInput(e)}
          className="note-title"
          required
        />
        {this.state.name.touched && <ValidationError message={nameError} />}
        <textarea
          placeholder="Contents of note here"
          onChange={e => this.handleTextArea(e)}
          className="note-content"
          cols="50"
          rows="10"
        ></textarea>
        <select
          onChange={e => this.handleDropdown(e)}
          id="folders"
          value={this.state.value}
          className="note-dropdown"
        >
          {folderOptions}
        </select>
        <button
          type="submit"
          className="note-submit"
          value="Submit"
          disabled={this.validateName()}
        >
          Submit
        </button>
      </form>
    );
  }
}
