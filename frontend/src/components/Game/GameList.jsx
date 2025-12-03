import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameRepository from "../../data/gameRepository";

function GameList() {
  const navigate = useNavigate();
  const gameRepository = new GameRepository();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await gameRepository.getAllGames();
      console.log(data);
      setGames(data);
    } catch (error) {
      setError("Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/games/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="game-list">
      <h2>Games</h2>
      {games.length === 0 ? (
        <p>No games found. Add a new game to get started.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game._id} className="game-item">
              <div className="game-title">{game.title}</div>
              <div className="game-actions">
                <button onClick={() => handleViewDetails(game._id)}>
                  View
                </button>
                <button onClick={() => handleEdit(game._id)}>Edit</button>
                <button onClick={() => handleDelete(game._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GameList;