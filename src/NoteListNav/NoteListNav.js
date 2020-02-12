import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import NotesContext from '../NotesContext';

export default function NoteListNav(props) {
  return (
    <NotesContext.Consumer>
      {(context) => (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {context.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(context.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          +
          <br />
          Folder
        </CircleButton>
      </div>
    </div>
      )}
    </NotesContext.Consumer>
  )
}

NoteListNav.defaultProps = {
  folders: []
}