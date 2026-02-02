import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SUPABASE_URL, SUPABASE_API_KEY } from '../client.js'

export default function HighlightCreator() {
    const { id } = useParams()
    const [creator, setCreator] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (id) fetchCreator()
    }, [id])

    async function fetchCreator() {
        try {
            const url = new URL(`${SUPABASE_URL}/rest/v1/creators`)
            url.searchParams.append('url', `eq.${decodeURIComponent(id)}`)
            url.searchParams.append('limit', '1')

            const response = await fetch(url.toString(), {
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
            setCreator((data && data[0]) || null)
        } catch (err) {
            console.error('Error fetching creator:', err)
            setError(err.message)
        }
    }

    if (!creator) return (
        <div className="highlight-creator-loading">
            <p>{error || 'Loading...'}</p>
            <Link to="/" className="btn-primary" style={{ marginTop: 12 }}>Back</Link>
        </div>
    )

    return (
        <>
            <div className="highlight-creator-main">
                <div className="highlight-creator-content">
                    <h1>{creator.name}</h1>
                    <p>{creator.description}</p>
                    <p style={{ marginBottom: 24 }}>{creator.url}</p>
                    <div className="highlight-creator-buttons">
                        <a
                            href={creator.url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary"
                        >
                            Visit Profile
                        </a>
                        <Link
                            to={`/edit-creator/${encodeURIComponent(creator.url)}`}
                            className="btn-primary"
                        >
                            Edit
                        </Link>
                        <Link
                            to="/"
                            className="btn-primary"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="highlight-creator-image-container">
                    {creator.imageURL && (
                        <img
                            src={creator.imageURL}
                            alt={creator.name}
                            className="highlight-creator-image"
                        />
                    )}
                </div>
            </div>
        </>
    )
}
