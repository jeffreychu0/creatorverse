import { useEffect, useState } from 'react'
import { SUPABASE_URL, SUPABASE_API_KEY } from '../client.js'
import CreatorCard from '../components/CreatorCard.jsx'
import { Link } from 'react-router-dom'

export default function ShowCreator() {
    const [creators, setCreators] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getCreators()
    }, [])

    async function getCreators() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/creators?select=*`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_API_KEY,
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setCreators(data || [])
        } catch (err) {
            console.error('Error fetching creators:', err)
            setError(err.message)
        }
    }

    return (
        <>
            <h1 className="show-creator-title">Creators</h1>
            {error && <p className="show-creator-error">{error}</p>}
            <ul className="creator-list">
                {creators.map((creator) => (
                    <li key={creator.url}>
                        <Link to={`/creator/${encodeURIComponent(creator.url)}`} className="creator-list-item">
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
        </>
    )
}
