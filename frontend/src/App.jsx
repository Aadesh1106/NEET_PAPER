"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PYQArchive from "./pages/PYQArchive";
import Solutions from "./pages/Solutions";
import CutoffAnalysis from "./pages/CutoffAnalysis";
import Footer from "./components/Footer";
import "./index.css";

// Create context for global state
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [papers, setPapers] = useState([]);

  const addBookmark = (paper) => {
    setBookmarks((prev) => {
      const exists = prev.find((p) => p._id === paper._id);
      if (exists) return prev;
      return [...prev, paper];
    });
  };

  const removeBookmark = (paperId) => {
    setBookmarks((prev) => prev.filter((p) => p._id !== paperId));
  };

  const isBookmarked = (paperId) => {
    return bookmarks.some((p) => p._id === paperId);
  };

  return (
    <AppContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        papers,
        setPapers,
      }}
    >
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/archive" element={<PYQArchive />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/cutoff-analysis" element={<CutoffAnalysis />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
