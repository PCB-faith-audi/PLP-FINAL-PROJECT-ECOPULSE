import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-lg mx-auto mt-20 bg-white border border-emerald-100 rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-emerald-700 mb-4">Something went wrong</h1>
          <p className="text-sm text-emerald-900 mb-6">
            {this.state.error?.message || "Unexpected error."}
          </p>
          <a href="/" className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">
            Go Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}