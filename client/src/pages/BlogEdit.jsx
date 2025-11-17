import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BlogEdit() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [cover, setCover] = useState(null);

  const handleUpdate = () => {
    blog.title = title;
    blog.content = content;

    if (cover) {
      blog.cover = URL.createObjectURL(cover);
    }

    alert("Blog Updated!");
  };

  return (
    <div className="p-6 md:ml-64 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      <div className="space-y-4">
        <input
          type="text"
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

        <img src={blog.cover} className="w-full h-64 object-cover rounded-lg" />

        <ReactQuill theme="snow" value={content} onChange={setContent} />

        <button
          onClick={handleUpdate}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
