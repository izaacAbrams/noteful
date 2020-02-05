import React from 'react';

export default function NoteItem(props) {
    const { i, note } = props;
    return (
        <li key={i}>
        <h2>{note.name}</h2>
        <p>Date Modified: {note.modified}</p>
        </li>
    )
}