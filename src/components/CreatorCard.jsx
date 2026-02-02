import React from 'react'
import { Link } from 'react-router-dom'

export default function CreatorCard({ name, url, description, imageUrl }) {
    return (
        <div className="creator-card">
            <div className="creator-card-image">
                <img src={imageUrl}></img>
                <Link
                    to={`/edit-creator/${encodeURIComponent(url)}`}
                    className="creator-card-edit-btn"
                    title="Edit creator"
                >
                    ✎
                </Link>
            </div>

            <div className="creator-card-content">
                <h2>{name}</h2>
                <text>{description}</text>
            </div>
        </div>
    )
}