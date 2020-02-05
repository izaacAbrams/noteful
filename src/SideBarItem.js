import React from 'react';

export default function SideBarItem(props) {
    const { i, folder } = props
    return (
        <li key={i}>
        <h2>{folder.name}</h2>
     
        </li>
        )
}