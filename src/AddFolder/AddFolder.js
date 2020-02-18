import React, { Component } from "react";
import NotesContext from "../NotesContext";
import { randomId } from "../notes-helpers";
import ValidationError from "../ValidationError";
import "./AddFolder.css";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      id: "",
      touched: false
    };
  }

  static contextType = NotesContext;

  handleInput = e => {
    this.setState({
      input: e.target.value,
      id: randomId(),
      touched: true
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let input = {
      id: this.state.id,
      name: this.state.input
    };

    fetch("http://localhost:9090/folders", {
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
        this.context.addFolder(data);
      })
      .catch(err => {
        console.log("Error: ", err);
      });

    this.props.history.push("/");
  };

  validateTitle() {
    const title = this.state.input.trim();
    if (title.length === 0) {
      return "Folder Title is Required";
    }
  }
  render() {
    const titleError = this.validateTitle();
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          className="folder-name"
          placeholder="Folder Name"
          aria-label="Folder Title"
          onChange={e => this.handleInput(e)}
          required
        />
        {this.state.touched && <ValidationError message={titleError} />}
        <button
          type="submit"
          value="Submit"
          className="folder-submit"
          aria-label="Submit"
          disabled={this.validateTitle()}
        >
          Submit
        </button>
      </form>
    );
  }
}
