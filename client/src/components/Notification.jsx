// src/components/Notification.jsx
import React from "react";

export default function Notification({ message }) {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
      {message}
    </div>
  );
}
