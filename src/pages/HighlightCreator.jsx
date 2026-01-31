import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client.js'

export default function HighlightCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    if (id) fetchCreator()
  }, [id])

  async function fetchCreator() {
    // Try numeric id, otherwise treat as URL identifier
    let query = supabase.from('creators')
    // Attempt to match by id first
    query = query.select().eq('url', decodeURIComponent(id)).limit(1)

    const { data, error } = await query
    if (error) {
      console.error('Error fetching creator', error)
      return
    }
    setCreator((data && data[0]) || null)
  }

  if (!creator) return (
    <div>
      <p>Loading...</p>
      <p><Link to="/">Back</Link></p>
    </div>
  )

  return (
    <div style={{display: 'flex'}}>
      <div style={{padding: "2rem"}}>
        <img src={creator.imageURL} alt={creator.name} style={{maxWidth: 240}} />
      </div>
      <div style={{padding: "2rem", background: "black"}}>
        <h1>{creator.name}</h1>
        <h2>{creator.description}</h2>
        <h2><a href={creator.url} target="_blank" rel="noreferrer">Visit external profile</a></h2>
        <h2><Link to="/">Back</Link></h2>
      </div>
    </div>
  )
}
