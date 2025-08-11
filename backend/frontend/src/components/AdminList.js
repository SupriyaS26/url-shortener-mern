import React, { useEffect, useState } from "react";

export default function AdminList() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/list")
      .then(res => res.json())
      .then(data => setUrls(data))
      .catch(err => console.error("Failed to fetch admin list", err));
  }, []);

  return (
    <div>
      <h2>All Shortened URLs</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {urls.length > 0 ? (
            urls.map(url => (
              <tr key={url._id}>
                <td>{url.short_code}</td>
                <td>
                  <a
                    href={`http://localhost:5000/${url.short_code}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`/${url.short_code}`}
                  </a>
                </td>
                <td>
                  <a
                    href={url.original_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {url.original_url}
                  </a>
                </td>
                <td>{url.clicks}</td>
                <td>{new Date(url.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" align="center">No URLs yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
