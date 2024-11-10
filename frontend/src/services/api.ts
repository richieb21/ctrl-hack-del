import { Links, Project } from "../constants/types";

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
};
