const API_URL = "http://localhost:3000/api/categories";

export default class CategoryRepository {
  async getCategories() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Category not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  async createCategory(category) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error("Failed to create category");

      return await response.json();
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async updateCategory(id, category) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error("Failed to update category");

      return await response.json();
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      return await response.json();
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}
