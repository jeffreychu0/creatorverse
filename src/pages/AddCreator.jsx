import React, { useState } from "react";
import { SUPABASE_URL, SUPABASE_API_KEY } from "../client.js";
import { useNavigate } from "react-router-dom";

export default function AddCreator() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        imageURL: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            const response = await fetch(`${SUPABASE_URL}/rest/v1/creators`, {
                method: 'POST',
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

            setSuccess("Creator added successfully!");
            setFormData({
                name: "",
                url: "",
                imageURL: "",
                description: ""
            });
            navigate("/");
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="form-container">
                <h1 className="form-title">Add Creator</h1>

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
                            required
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
                            required
                            className="form-textarea"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-success"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </>
    )
}