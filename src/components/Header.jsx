import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <Link to="/" >Note</Link>
            <Link to="/notes-list" >List</Link>
        </div>
    )
}

export default Header