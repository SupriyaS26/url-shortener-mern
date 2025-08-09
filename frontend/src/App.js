import React from "react";
import UrlForm from "./components/UrlForm";
import AdminList from './components/AdminList';
import "./App.css";

export default function App() {
  return (
    <>
      <div>
        <UrlForm />
      </div>
      <div>
        <h1>Admin Page</h1>
        <AdminList />
      </div>
    </>
  );
}
