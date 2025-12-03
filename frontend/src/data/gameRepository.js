const API_URL = "http://localhost:3000/api/games";
class GameRepository {
  async getAllGames() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  async getGameById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Game not found");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  async createGame(game) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });

      if (!response.ok) {
        throw new Error("Failed to create games");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async updateGame(id, game) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });

      if (!response.ok) {
        throw new Error("Failed to update game");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async deleteGame(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete game");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default GameRepository;