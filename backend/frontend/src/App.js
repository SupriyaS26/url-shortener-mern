import React, { useState } from "react";
import UrlForm from "./components/UrlForm";
import AdminList from "./components/AdminList";
import "./App.css";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="app-container">
      <div></div>
      <UrlForm />
      
      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "Hide Admin List" : "Show Admin List"}
      </button>

      {showAdmin && (
        <div className="admin-section">
          <h2>Admin Page - All Shortened URLs</h2>
          <AdminList />
        </div>
      )}
    </div>
  );
}
