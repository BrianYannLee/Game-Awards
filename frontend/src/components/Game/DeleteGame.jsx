import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameRepository from "../../data/gameRepository";

function DeleteGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gameRepository = new GameRepository();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        const data = await gameRepository.getGameById(id);
        setGame(data);
      } catch (error) {
        setError("Failed to load game details");
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await gameRepository.deleteGame(id);
      navigate("/");
    } catch (error) {
      setError("Failed to delete game");
      setDeleting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <div className="delete-game">
      <h2>Confirm Deletion</h2>

      <div className="confirmation-message">
        <p>
          Are you sure you want to delete this game? This action cannot be
          undone.
        </p>
      </div>

      <div className="game-details-confirm">
        <h3>{game.title}</h3>
        <p><strong>Release Date:</strong> {game.releaseDate.split("T")[0]}</p>
        <p><strong>Developer:</strong> {game.developer}</p>
      </div>

      <div className="confirmation-actions">
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Game"}
        </button>
        <button
          className="cancel-button"
          onClick={() => navigate("/")}
          disabled={deleting}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}

export default DeleteGame;
