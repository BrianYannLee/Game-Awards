const API_URL = "http://localhost:3000/api/nominees";

export default class NomineeRepository {
  async getAllNominees() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch nominees");
      }
      return await response.json();
      
    } catch (error) {
      console.error("Error fetching nominees:", error);
      throw error;
    }
  }

  async createNominee(gameId, categoryId) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, categoryId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create nominee");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating nominee:", error);
      throw error;
    }
  }

  async updateNominee(gameId, categoryId, newGameId, newCategoryId) {
    try {
      const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, categoryId, newGameId, newCategoryId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update nominee");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating nominee:", error);
      throw error;
    }
  }

  async deleteNominee(id) {
  try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete nominee");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting nominee:", error);
      throw error;
    }
  }
}
