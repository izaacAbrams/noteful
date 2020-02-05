import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import SideBarItem from './SideBarItem';

class SideBar extends Component {
 
    render() {
       const folders = this.props.folders.map((folder, i) => {
        return <SideBarItem folder={folder} i={i} />
  
       })
        return (
            <ul>
            {folders}   
            <Link to='/addFolder'>Add Folder</Link>
            </ul>
        )
    }
}

export default SideBar;