import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameRepository from "../../data/gameRepository";

export default function GameList() {
  const navigate = useNavigate();
  const gameRepo = new GameRepository();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await gameRepo.getAllGames();
        setGames(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load games.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) return <div>Loading games...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const years = Array.from(
    new Set(games.map((g) => new Date(g.releaseDate).getFullYear()))
  ).sort();

  const filteredGames = games.filter((g) => {
    const matchesTitle = g.title.toLowerCase().includes(searchTerm.toLowerCase());
    const releaseYear = new Date(g.releaseDate).getFullYear().toString();
    const matchesYear = selectedYear ? releaseYear === selectedYear : true;
    return matchesTitle && matchesYear;
  });

  const handleView = (id) => navigate(`/games/details/${id}`);
  const handleEdit = (id) => navigate(`/games/edit/${id}`);
  const handleDelete = (id) => navigate(`/games/delete/${id}`);

  return (
    <div className="game-list">
      <h2>Games</h2>

      <button
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/games/create")}
      >
        Add New Game
      </button>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search games by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {filteredGames.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredGames.map((game) => (
            <li
              key={game._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <span>
                {game.title} ({new Date(game.releaseDate).getFullYear()})
              </span>
              <div>
                <button onClick={() => handleView(game._id)}>View</button>
                <button
                  onClick={() => handleEdit(game._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(game._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
