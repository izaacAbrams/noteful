import React from 'react'
import { Link } from 'react-router-dom'
import './Note.css'
import { parseISO } from 'date-fns'
import NotesContext from '../NotesContext'
export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => [],
  }
  static contextType = NotesContext

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
        return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(err => console.log(err))
    
  }
  render() {
    const { name, id, modified } = this.props;
  return (
    <div className='Note'>
       <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button 
        className='Note__delete' 
        type='button'
        onClick={this.handleClickDelete}>
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
              {parseISO(modified).toDateString()}
          </span> 
        </div>
      </div> 
    </div>
  )
  }
}