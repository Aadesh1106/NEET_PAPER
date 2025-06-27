"use client";

import { useState, useEffect } from "react";
import { Search, Filter, BookOpen } from "lucide-react";
import { fetchPapers } from "../services/api";
import { useAppContext } from "../App";
import PaperCard from "../components/PaperCard";
import FilterPanel from "../components/FilterPanel";

const PYQArchive = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    subject: "",
    difficulty: "",
  });

  const { bookmarks, addBookmark, removeBookmark, isBookmarked } =
    useAppContext();

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await fetchPapers();
        setPapers(data);
        setFilteredPapers(data);
      } catch (error) {
        console.error("Error loading papers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, []);

  useEffect(() => {
    let filtered = papers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (paper) =>
          paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.year.toString().includes(searchTerm)
      );
    }

    // Apply other filters
    if (filters.year) {
      filtered = filtered.filter(
        (paper) => paper.year.toString() === filters.year
      );
    }
    if (filters.subject) {
      filtered = filtered.filter((paper) => paper.subject === filters.subject);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(
        (paper) => paper.difficulty === filters.difficulty
      );
    }

    setFilteredPapers(filtered);
  }, [searchTerm, filters, papers]);

  const handleDownload = (paper) => {
    // Create download link
    const link = document.createElement("a");
    link.href = `http://localhost:3001/uploads/${paper.pdf_link}`;
    link.download = `${paper.subject}_${paper.year}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleBookmark = (paper) => {
    if (isBookmarked(paper._id)) {
      removeBookmark(paper._id);
    } else {
      addBookmark(paper);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">PYQ Archive</h1>
          <p className="text-gray-600">
            Browse and download previous year NEET question papers
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by subject or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              papers={papers}
            />
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPapers.length} of {papers.length} papers
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <PaperCard
              key={paper._id}
              paper={paper}
              onDownload={() => handleDownload(paper)}
              onToggleBookmark={() => toggleBookmark(paper)}
              isBookmarked={isBookmarked(paper._id)}
            />
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No papers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PYQArchive;
