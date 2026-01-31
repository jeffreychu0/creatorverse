import React from "react";
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <header style={{padding: 12, borderBottom: '1px solid #eee', display: "flex"}}>
                <div>
                    <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                        <h1 style={{margin: 0}}>Creatorverse</h1>
                    </Link>
                </div>
            </header>
        </>
    )
}