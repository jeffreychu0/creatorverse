import React from "react";
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <header className="app-header">
                <div>
                    <Link to="/" className="header-title">
                        <h1 className="header-title">Creatorverse</h1>
                    </Link>
                </div>
                <div className="header-actions">
                    <Link to="/add">
                        <button className="btn">
                            Add
                        </button>
                    </Link>
                </div>
            </header>
        </>
    )
}