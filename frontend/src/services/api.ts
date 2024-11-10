import { MatchResult } from "../components/JobMatch";
import {
  Award,
  Experience,
  ExtraCurricular,
  Links,
  Project,
  Education,
  Resume,
} from "../constants/types";

const API_URL = "http://127.0.0.1:5000";

export const api = {
  async register(username: string, email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error(
          "Unable to connect to server. Please check if the server is running."
        );
      }
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error(
          "Unable to connect to server. Please check if the server is running."
        );
      }
      throw error;
    }
  },

  async updateSkills(skills: Array<{ name: string; category: string }>) {
    try {
      const response = await fetch(`${API_URL}/user/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ skills }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update skills failed");
      }
    } catch (error) {
      console.error("Update skills error:", error);
      throw error;
    }
  },

  async updateProjects(projects: Project[]) {
    try {
      const response = await fetch(`${API_URL}/user/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ projects }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update projects failed");
      }
    } catch (error) {
      console.error("Update projects error:", error);
      throw error;
    }
  },

  async updateLinks(links: Links) {
    try {
      const response = await fetch(`${API_URL}/user/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ links }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update links failed");
      }
    } catch (error) {
      console.error("Update links error:", error);
      throw error;
    }
  },

  async getUser() {
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      console.log(data.projects);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get user failed");
      }

      return data;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },

  async updateName(name: string) {
    try {
      const response = await fetch(`${API_URL}/user/name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update name failed");
      }
    } catch (error) {
      console.error("Update name error:", error);
      throw error;
    }
  },

  async updateExperiences(experiences: Experience[]) {
    try {
      const response = await fetch(`${API_URL}/user/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ experiences }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update experiences failed");
      }
    } catch (error) {
      console.error("Update experiences error:", error);
      throw error;
    }
  },

  async updateExtracurriculars(extracurriculars: ExtraCurricular[]) {
    try {
      const response = await fetch(`${API_URL}/user/extracurriculars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ extracurriculars }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update extracurriculars failed");
      }
    } catch (error) {
      console.error("Update extracurriculars error:", error);
      throw error;
    }
  },

  async updateAwards(awards: Award[]) {
    try {
      const response = await fetch(`${API_URL}/user/awards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ awards }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update awards failed");
      }
    } catch (error) {
      console.error("Update awards error:", error);
      throw error;
    }
  },

  async updateEducation(education: Education[]) {
    try {
      const response = await fetch(`${API_URL}/user/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ education }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update education failed");
      }
    } catch (error) {
      console.error("Update education error:", error);
      throw error;
    }
  },

  async generateResume() {
    try {
      const response = await fetch(`${API_URL}/resume/generate-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      return data.latex_content;
    } catch (error) {
      console.error("Generate resume error:", error);
      throw error;
    }
  },

  async generatePDF() {
    try {
      const response = await fetch(`${API_URL}/resume/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Generate PDF failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Generate PDF error:", error);
      throw error;
    }
  },

  async compilePdf(latex: string) {
    try {
      const response = await fetch(`${API_URL}/resume/compile-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ latex }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Compile PDF failed");
      }

      // Create a blob from the PDF data
      const blob = await response.blob();
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      return { pdf: url };
    } catch (error) {
      console.error("Compile PDF error:", error);
      throw error;
    }
  },

  async generateResumeJSON() {
    console.log("Generating resume JSON...");
    try {
      const response = await fetch(`${API_URL}/resume/generate-resume-json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("Data received:", data);
      return data.resume;
    } catch (error) {
      console.error("Generate resume JSON error:", error);
      throw error;
    }
  },

  async saveResumeOrder(resume: Resume) {
    try {
      const response = await fetch(`${API_URL}/resume/save-resume-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(resume),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Save resume order failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Save resume order error:", error);
      throw error;
    }
  },

  async matchJob(jobDescription: string) {
    try {
      const response = await fetch(`${API_URL}/rank/jobmatch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Job matching failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Job matching error:", error);
      throw error;
    }
  },

  async generateResumeFromMatches(matches: MatchResult[]) {
    try {
      const response = await fetch(`${API_URL}/rank/generate-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ matches }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Resume generation failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Resume generation error:", error);
      throw error;
    }
  },
};
