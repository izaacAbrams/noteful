import React, { Component } from "react";

class NotesError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h3>Could not display content.</h3>;
    }
    return this.props.children;
  }
}

export default NotesError;
