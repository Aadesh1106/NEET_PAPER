"use client";

import {
  Download,
  BookOpen,
  Star,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { downloadFile, trackDownload } from "../services/api";

const PaperCard = ({ paper, onDownload, onToggleBookmark, isBookmarked }) => {
  const averageRating =
    paper.ratings?.length > 0
      ? (
          paper.ratings.reduce((a, b) => a + b, 0) / paper.ratings.length
        ).toFixed(1)
      : "N/A";

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = async () => {
    try {
      if (paper.pdf_link) {
        // Track download
        await trackDownload(paper._id);

        // Download file
        const filename = `${paper.subject}_${paper.year}.pdf`;
        await downloadFile(paper.pdf_link, filename);

        // Call parent callback if provided
        if (onDownload) {
          onDownload();
        }
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const handleSolutionDownload = async () => {
    try {
      if (paper.solution_link) {
        const filename = `${paper.subject}_${paper.year}_solution.pdf`;
        await downloadFile(paper.solution_link, filename);
      }
    } catch (error) {
      console.error("Error downloading solution:", error);
      alert("Failed to download solution. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {paper.subject} {paper.year}
          </h3>
          <div className="flex items-center mt-2 space-x-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                paper.difficulty
              )}`}
            >
              {paper.difficulty}
            </span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{averageRating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({paper.downloads || 0} downloads)
            </span>
          </div>
        </div>
        <button
          onClick={onToggleBookmark}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Cutoffs:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>General: {paper.cutoffs?.general || "N/A"}</div>
          <div>OBC: {paper.cutoffs?.obc || "N/A"}</div>
          <div>SC: {paper.cutoffs?.sc || "N/A"}</div>
          <div>ST: {paper.cutoffs?.st || "N/A"}</div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleDownload}
          disabled={!paper.pdf_link}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </button>
        {paper.solution_link ? (
          <button
            onClick={handleSolutionDownload}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Solution
          </button>
        ) : (
          <Link
            to="/solutions"
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Solutions
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaperCard;
