import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameRepository from "../../data/gameRepository";

function CreateGame() {
  const navigate = useNavigate();
  const gameRepository = new GameRepository();

  const [game, setGame] = useState({
    title: "",
    releaseDate: "",
    developer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Prevent the page from reloading
    e.preventDefault();
    // Talk to API to create the game
    try {
      setLoading(true);
      await gameRepository.createGame(game);
      navigate("/");
    } catch (error) {
      setError("Failed to create game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-game">
      <h2>Create New Game</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={game.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseDate">ReleaseDate:</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={game.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="developer">Developer:</label>
          <input
            type="text"
            id="developer"
            name="developer"
            value={game.developer}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Game"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGame;
