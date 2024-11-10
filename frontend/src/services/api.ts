import {
  Award,
  Experience,
  ExtraCurricular,
  Links,
  Project,
  Education,
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
};
