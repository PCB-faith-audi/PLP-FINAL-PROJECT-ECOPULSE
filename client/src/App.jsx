import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EnergyLogs from "./pages/EnergyLogs.jsx";
import CarbonLogs from "./pages/CarbonLogs.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Resources from "./pages/Resources.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import SignIn from "./pages/SignIn.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* Auth pages (outside layout) */}
      <Route path="/sign-in" element={<SignIn />} />

      {/* App layout */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="energy"
          element={
            <ProtectedRoute>
              <EnergyLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="carbon"
          element={
            <ProtectedRoute>
              <CarbonLogs />
            </ProtectedRoute>
          }
        />
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
