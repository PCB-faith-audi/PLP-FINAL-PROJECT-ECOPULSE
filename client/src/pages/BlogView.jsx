import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogs } from "../data/blogs";

export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="p-6 md:ml-64 text-center">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Link
          to="/blogs"
          className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    const index = blogs.findIndex((b) => b.id === blog.id);
    if (index > -1) {
      blogs.splice(index, 1);
      alert("Blog deleted!");
      navigate("/blogs");
    }
  };

  return (
    <div className="p-6 md:ml-64 max-w-4xl mx-auto">
      {/* Cover Image */}
      {blog.cover && (
        <img
          src={blog.cover}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />
      )}

      {/* Title & Date */}
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">{blog.date}</p>

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Admin Buttons */}
      <div className="flex gap-4">
        <Link
          to={`/blogs/edit/${blog.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>
        <Link
          to="/blogs"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
}

