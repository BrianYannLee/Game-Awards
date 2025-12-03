import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import GameRepository from "../../data/gameRepository";

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gameRepository = new GameRepository();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        const data = await gameRepository.getGameById(id);
        console.log(data);
        setGame(data);
      } catch (error) {
        setError("Failed to load game details");
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    navigate(`/delete/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <div className="game-details">
      <h2>{game.title}</h2>
      <p>Release Date: {game.releaseDate.split("T")[0]}</p>
      <p>Developer: {game.developer}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
      <button onClick={() => navigate("/")} className="back-button">
        Back to List
      </button>
    </div>
  );
}

export default GameDetails;
