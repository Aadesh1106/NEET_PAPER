"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Download, BookOpen, TrendingUp, Star, ArrowRight } from "lucide-react";
import StatsCard from "../components/StatsCard";
import { fetchPapers, fetchStats } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPapers: 0,
    totalDownloads: 0,
    averageRating: 0,
    subjects: 0,
  });
  const [recentPapers, setRecentPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch stats from the new API endpoint
        const statsData = await fetchStats();
        setStats({
          totalPapers: statsData.totalPapers,
          totalDownloads: statsData.totalDownloads,
          averageRating: statsData.averageRating,
          subjects: statsData.subjects,
        });

        // Get recent papers (latest 3)
        const papers = await fetchPapers({ sortBy: "year", order: "desc" });
        const recent = papers.slice(0, 3);
        setRecentPapers(recent);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            NEET PYQ Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your ultimate destination for NEET Previous Year Questions,
            Solutions, and Cutoff Analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/archive"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Browse Papers
            </Link>
            <Link
              to="/solutions"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-blue-600 flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={BookOpen}
              title="Total Papers"
              value={stats.totalPapers}
              color="blue"
            />
            <StatsCard
              icon={Download}
              title="Downloads"
              value={stats.totalDownloads.toLocaleString()}
              color="green"
            />
            <StatsCard
              icon={Star}
              title="Avg Rating"
              value={stats.averageRating}
              color="yellow"
            />
            <StatsCard
              icon={TrendingUp}
              title="Subjects"
              value={stats.subjects}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Recent Papers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recent Papers</h2>
            <Link
              to="/archive"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPapers.map((paper) => (
              <div
                key={paper._id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {paper.subject} {paper.year}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      paper.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : paper.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {paper.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  General Cutoff: {paper.cutoffs?.general || "N/A"}
                </p>
                <p className="text-gray-600 mb-4">
                  Downloads: {paper.downloads || 0}
                </p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Download
                  </button>
                  <Link
                    to="/solutions"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-center"
                  >
                    Solutions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose NEET PYQ Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Downloads</h3>
              <p className="text-gray-600">
                Download previous year papers and solutions with just one click
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Solutions</h3>
              <p className="text-gray-600">
                Step-by-step solutions for better understanding and preparation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cutoff Analysis</h3>
              <p className="text-gray-600">
                Analyze yearly cutoff trends across all categories
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
