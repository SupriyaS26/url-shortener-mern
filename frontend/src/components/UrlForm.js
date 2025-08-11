import React, { useState } from 'react';

export default function UrlForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      alert("Please enter a URL");
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: originalUrl }), // backend expects this
      });
      if (!res.ok) throw new Error('Server error: ' + res.status);
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)} // bind state here
          />
          <button type="submit">Shorten</button>
        </div>
      </form>
      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
