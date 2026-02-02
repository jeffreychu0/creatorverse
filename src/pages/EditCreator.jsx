import React, { useState, useEffect } from "react";
import { SUPABASE_URL, SUPABASE_API_KEY } from "../client.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCreator() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        imageURL: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [fetching, setFetching] = useState(true);
    const [creatorId, setCreatorId] = useState(null);

    useEffect(() => {
        if (id) fetchCreator();
    }, [id]);

    const fetchCreator = async () => {
        try {
            setFetching(true);
            const url = new URL(`${SUPABASE_URL}/rest/v1/creators`);
            url.searchParams.append('url', `eq.${decodeURIComponent(id)}`);
            url.searchParams.append('limit', '1');

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_API_KEY,
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data[0]) {
                const creator = data[0];
                setCreatorId(creator.url);
                setFormData({
                    name: creator.name || "",
                    url: creator.url || "",
                    imageURL: creator.imageURL || "",
                    description: creator.description || ""
                });
            } else {
                setError("Creator not found");
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/creators?url=eq.${encodeURIComponent(decodeURIComponent(creatorId))}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_API_KEY,
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    name: formData.name,
                    url: formData.url,
                    imageURL: formData.imageURL,
                    description: formData.description
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess("Creator updated successfully!");
            navigate("/");
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this creator? This action cannot be undone.");
        if (!confirmed) return;

        setDeleting(true);
        setError("");

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/creators?url=eq.${encodeURIComponent(decodeURIComponent(creatorId))}`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_API_KEY,
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess("Creator deleted successfully!");
            navigate("/");
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setDeleting(false);
        }
    };

    if (fetching) {
        return (
            <div className="form-container">
                <p>Loading creator data...</p>
            </div>
        );
    }

    return (
        <>
            <div className="form-container">
                <h1 className="form-title">Edit Creator</h1>
                {error && <p className="form-message form-error">{error}</p>}
                {success && <p className="form-message form-success">{success}</p>}
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Creator Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="url" className="form-label">Creator URL: </label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageURL" className="form-label">Creator Image URL: </label>
                        <input
                            type="text"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description: </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="6"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-textarea"
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-success"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="btn-danger"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}