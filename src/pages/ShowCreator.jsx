import { useEffect, useState } from 'react'
import { supabase } from '../client.js'
import CreatorCard from '../components/CreatorCard.jsx'
import { Link } from 'react-router-dom'

export default function ShowCreator() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    getCreators()
  }, [])

  async function getCreators() {
    const { data } = await supabase.from('creators').select();
    setCreators(data)
  }

  return (
    <main>
      <h1 style={{textAlign: 'center'}}>Creators</h1>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, justifyContent: "center"}}>
        {creators.map((creator) => (
          <li key={creator.url}>
            <Link to={`/creator/${encodeURIComponent(creator.url)}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <CreatorCard
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageUrl={creator.imageURL}
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
