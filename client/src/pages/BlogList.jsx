import React from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";

export default function BlogList() {
  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Articles & Blogs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img src={blog.cover} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-500 text-sm">{blog.date}</p>

              <p className="mt-2 text-gray-700 line-clamp-2">
                {blog.content}
              </p>

              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
                Read More
              </button>
            </div>
            <Link to={`/blogs/edit/${blog.id}`} className="text-blue-600 underline ml-4">
                Edit
            </Link>
        </Link>
        ))}
      </div>
    </div>
  );
}
