import React from 'react'

export default function CreatorCard({ name, url, description, imageUrl}) {
  return (
    <>
    <div style={{backgroundColor: "#000000", display: "flex", gap: '10px', width: '60vw'}} >
        <img src={imageUrl} style={{padding: '15px', maxWidth: "150px"}}></img>
        
        <div>
            <h2 style={{textAlign: 'left'}}>{name}</h2>
            <text>{description}</text>
        </div>
    </div>
    </>
  )
}