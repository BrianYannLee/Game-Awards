import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import GameRepository from "../../data/gameRepository";

function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gameRepository = new GameRepository();

  const [game, setGame] = useState({
    title: "",
    developer: "",
    releaseDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        const data = await gameRepository.getGameById(id);
        setGame({
        ...data,
        releaseDate: data.releaseDate.split("T")[0],
      });
      } catch (error) {
        setError("Failed to load game");
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await gameRepository.updateGame(id, {
        ...game,
        releaseDate: new Date(game.releaseDate),
        });
      navigate(`/games/${id}`);
    } catch (error) {
      setError("Failed to update game");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-game">
      <h2>Edit Game</h2>

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
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/games/${id}`)}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGame;
