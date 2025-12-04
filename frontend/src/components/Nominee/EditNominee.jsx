import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NomineeRepository from "../../data/nomineeRepository";
import GameRepository from "../../data/gameRepository";

export default function EditNominee() {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();

  const nomineeRepo = new NomineeRepository();
  const gameRepo = new GameRepository();

  const [allGames, setAllGames] = useState([]);
  const [categoryGames, setCategoryGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load all games and all nominees for this category
      const [gamesData, nomineesData] = await Promise.all([
        gameRepo.getAllGames(),
        nomineeRepo.getAllNominees(),
      ]);

      setAllGames(gamesData);

      // Filter nominees for this category
      const filtered = nomineesData.filter(
        (n) => n.category._id === categoryId
      );

      setCategoryGames(
        filtered.map((n) => ({
          gameId: n.game._id,
          title: n.game.title,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = async () => {
    if (!selectedGame) return;
    try {
      setSaving(true);
      await nomineeRepo.createNominee(selectedGame, categoryId);
      setSelectedGame("");
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to add game");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveGame = async (gameId) => {
    if (!window.confirm("Are you sure you want to remove this game?")) return;
    try {
      await nomineeRepo.deleteNominee(gameId, categoryId);
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to remove game");
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Manage Nominees for Category: {categoryName}</h2>

      {/* Current games in this category */}
      {categoryGames.length === 0 ? (
        <p>No games in this category yet.</p>
      ) : (
        <ul>
          {categoryGames.map((g) => (
            <li key={g.gameId}>
              {g.title}{" "}
              <button onClick={() => handleRemoveGame(g.gameId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {/* Add a new game to this category */}
      <div style={{ marginTop: "20px" }}>
        <label>Select Game to Add: </label>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          <option value="">--Select Game--</option>
          {allGames
            .filter((g) => !categoryGames.find((cg) => cg.gameId === g._id))
            .map((g) => (
              <option key={g._id} value={g._id}>
                {g.title}
              </option>
            ))}
        </select>
        <button onClick={handleAddGame} disabled={saving}>
          {saving ? "Adding..." : "Add Game"}
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/nominee")}>Back to Nominee Dashboard</button>
      </div>
    </div>
  );
}
