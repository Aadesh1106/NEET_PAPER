"use client";

import { useState, useEffect } from "react";
import { Download, Eye, EyeOff } from "lucide-react";
import { fetchPapers } from "../services/api";

const Solutions = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSolution, setShowSolution] = useState({});

  // Mock questions data - in real app, this would come from API
  const mockQuestions = [
    {
      id: 1,
      question:
        "Which of the following is the correct order of increasing atomic radii?",
      options: [
        "Li < Na < K < Rb",
        "Rb < K < Na < Li",
        "Na < Li < K < Rb",
        "K < Rb < Li < Na",
      ],
      correct: 0,
      solution:
        "Atomic radius increases down the group due to addition of new electron shells. Therefore, Li < Na < K < Rb is the correct order.",
    },
    {
      id: 2,
      question:
        "The process of photosynthesis occurs in which part of the plant cell?",
      options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
      correct: 1,
      solution:
        "Photosynthesis occurs in chloroplasts, which contain chlorophyll and other pigments necessary for capturing light energy.",
    },
    {
      id: 3,
      question: "What is the SI unit of electric current?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correct: 1,
      solution:
        "The SI unit of electric current is Ampere (A), named after André-Marie Ampère.",
    },
  ];

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await fetchPapers();
        setPapers(data);
        if (data.length > 0) {
          setSelectedPaper(data[0]);
        }
      } catch (error) {
        console.error("Error loading papers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, []);

  const toggleSolution = (questionId) => {
    setShowSolution((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleDownloadSolution = (paper) => {
    if (paper.solution_link) {
      const link = document.createElement("a");
      link.href = `http://localhost:3001/uploads/${paper.solution_link}`;
      link.download = `${paper.subject}_${paper.year}_solution.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Solutions</h1>
          <p className="text-gray-600">
            Interactive solutions for NEET previous year questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Paper Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Paper
              </h3>
              <div className="space-y-2">
                {papers.map((paper) => (
                  <button
                    key={paper._id}
                    onClick={() => setSelectedPaper(paper)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPaper?._id === paper._id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="font-medium">{paper.subject}</div>
                    <div className="text-sm text-gray-500">{paper.year}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions Content */}
          <div className="lg:col-span-3">
            {selectedPaper ? (
              <div className="bg-white rounded-lg shadow-sm">
                {/* Paper Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedPaper.subject} {selectedPaper.year}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Difficulty: {selectedPaper.difficulty}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownloadSolution(selectedPaper)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Questions */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Interactive Questions
                  </h3>
                  <div className="space-y-6">
                    {mockQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-gray-900 mb-3">
                            Q{index + 1}. {question.question}
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                  showSolution[question.id] &&
                                  optionIndex === question.correct
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => toggleSolution(question.id)}
                            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            {showSolution[question.id] ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Hide Solution
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Show Solution
                              </>
                            )}
                          </button>
                        </div>

                        {showSolution[question.id] && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h5 className="font-semibold text-blue-900 mb-2">
                              Solution:
                            </h5>
                            <p className="text-blue-800">{question.solution}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a paper to view solutions
                </h3>
                <p className="text-gray-600">
                  Choose a paper from the sidebar to start viewing interactive
                  solutions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
