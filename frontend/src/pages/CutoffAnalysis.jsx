"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { fetchPapers, fetchCutoffs } from "../services/api";
import CutoffChart from "../components/CutoffChart";

const CutoffAnalysis = () => {
  const [papers, setPapers] = useState([]);
  const [cutoffData, setCutoffData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: "general", label: "General", color: "blue" },
    { key: "obc", label: "OBC", color: "green" },
    { key: "sc", label: "SC", color: "yellow" },
    { key: "st", label: "ST", color: "purple" },
  ];

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await fetchPapers();
        setPapers(data);
      } catch (error) {
        console.error("Error loading papers:", error);
      }
    };

    loadPapers();
  }, []);

  useEffect(() => {
    const loadCutoffData = async () => {
      try {
        const data = await fetchCutoffs(selectedCategory, selectedSubject);
        setCutoffData(data);
      } catch (error) {
        console.error("Error loading cutoff data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (papers.length > 0) {
      loadCutoffData();
    }
  }, [selectedCategory, selectedSubject, papers]);

  const getCutoffTrend = () => {
    if (cutoffData.length < 2) return { trend: "stable", change: 0 };

    const latest = cutoffData[cutoffData.length - 1]?.cutoff || 0;
    const previous = cutoffData[cutoffData.length - 2]?.cutoff || 0;
    const change = latest - previous;

    if (change > 0) return { trend: "up", change };
    if (change < 0) return { trend: "down", change: Math.abs(change) };
    return { trend: "stable", change: 0 };
  };

  const getAverageCutoff = () => {
    if (cutoffData.length === 0) return 0;
    return Math.round(
      cutoffData.reduce((sum, item) => sum + item.cutoff, 0) / cutoffData.length
    );
  };

  const getHighestCutoff = () => {
    if (cutoffData.length === 0) return { year: 0, cutoff: 0 };
    return cutoffData.reduce((max, item) =>
      item.cutoff > max.cutoff ? item : max
    );
  };

  const getLowestCutoff = () => {
    if (cutoffData.length === 0) return { year: 0, cutoff: 0 };
    return cutoffData.reduce((min, item) =>
      item.cutoff < min.cutoff ? item : min
    );
  };

  const subjects = [...new Set(papers.map((p) => p.subject))];
  const trend = getCutoffTrend();
  const avgCutoff = getAverageCutoff();
  const highestCutoff = getHighestCutoff();
  const lowestCutoff = getLowestCutoff();

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cutoff Analysis
          </h1>
          <p className="text-gray-600">
            Analyze NEET cutoff trends across different categories and years
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedCategory === category.key
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Trend
                </p>
                <div className="flex items-center mt-1">
                  {trend.trend === "up" && (
                    <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                  )}
                  {trend.trend === "down" && (
                    <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
                  )}
                  {trend.trend === "stable" && (
                    <Minus className="h-5 w-5 text-gray-500 mr-1" />
                  )}
                  <span
                    className={`text-lg font-semibold ${
                      trend.trend === "up"
                        ? "text-green-600"
                        : trend.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {trend.change > 0
                      ? `+${trend.change}`
                      : trend.change === 0
                      ? "Stable"
                      : `-${trend.change}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Average Cutoff</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{avgCutoff}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Highest Cutoff</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {highestCutoff.cutoff}
            </p>
            <p className="text-xs text-gray-500">in {highestCutoff.year}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Lowest Cutoff</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {lowestCutoff.cutoff}
            </p>
            <p className="text-xs text-gray-500">in {lowestCutoff.year}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Cutoff Trends -{" "}
            {categories.find((c) => c.key === selectedCategory)?.label}
            {selectedSubject !== "all" && ` (${selectedSubject})`}
          </h3>
          <CutoffChart data={cutoffData} />
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Detailed Cutoff Data
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    General
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OBC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ST
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {papers
                  .filter(
                    (paper) =>
                      selectedSubject === "all" ||
                      paper.subject === selectedSubject
                  )
                  .sort((a, b) => b.year - a.year)
                  .map((paper) => (
                    <tr key={paper._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {paper.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {paper.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paper.cutoffs?.general || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paper.cutoffs?.obc || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paper.cutoffs?.sc || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paper.cutoffs?.st || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paper.downloads || 0}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CutoffAnalysis;
