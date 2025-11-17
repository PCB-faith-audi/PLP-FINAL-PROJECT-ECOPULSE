import React, { useState } from "react";
import { blogs } from "../data/blogs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState("");

  const handlePublish = () => {
    const newBlog = {
      id: blogs.length + 1,
      title,
      date: new Date().toISOString().split("T")[0],
      content,
      cover: cover ? URL.createObjectURL(cover) : "/placeholder.jpg",
    };

    blogs.push(newBlog);
    alert("Blog Published (Temporary — will save to backend later)");
  };

  return (
    <div className="p-6 md:ml-64 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full px-4 py-2 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded-lg"
          onChange={(e) => setCover(e.target.files[0])}
        />

        {cover && (
          <img
            className="w-full h-64 object-cover rounded-lg"
            src={URL.createObjectURL(cover)}
            alt="preview"
          />
        )}

        <ReactQuill theme="snow" value={content} onChange={setContent} />

        <button
          onClick={handlePublish}
          className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
}
