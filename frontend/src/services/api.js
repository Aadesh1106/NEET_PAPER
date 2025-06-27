const API_BASE_URL = "http://localhost:3001";

export const fetchPapers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.year) queryParams.append("year", filters.year);
    if (filters.subject) queryParams.append("subject", filters.subject);
    if (filters.difficulty)
      queryParams.append("difficulty", filters.difficulty);
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.order) queryParams.append("order", filters.order);

    const url = queryParams.toString()
      ? `${API_BASE_URL}/papers?${queryParams}`
      : `${API_BASE_URL}/papers`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch papers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching papers:", error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

export const trackDownload = async (paperId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/papers/${paperId}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to track download");
    }
    return await response.json();
  } catch (error) {
    console.error("Error tracking download:", error);
    throw error;
  }
};

export const fetchCutoffs = async (category = "general", subject = "all") => {
  try {
    const queryParams = new URLSearchParams({ category });
    if (subject !== "all") queryParams.append("subject", subject);

    const response = await fetch(`${API_BASE_URL}/cutoffs?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cutoffs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cutoffs:", error);
    throw error;
  }
};

// Helper function to get file download URL
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  return `${API_BASE_URL}/${filePath}`;
};

// Helper function to download file
export const downloadFile = async (filePath, filename) => {
  try {
    const url = getFileUrl(filePath);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    return true;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
