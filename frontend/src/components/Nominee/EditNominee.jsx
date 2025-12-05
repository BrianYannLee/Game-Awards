import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NomineeRepository from "../../data/nomineeRepository";
import GameRepository from "../../data/gameRepository";
import CategoryRepository from "../../data/categoryRepository";

export default function EditNominee() {
  const { id } = useParams();   // nomineeId
  const navigate = useNavigate();

  const nomineeRepo = new NomineeRepository();
  const gameRepo = new GameRepository();
  const categoryRepo = new CategoryRepository();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    loadFormData();
  }, [id]);

  const loadFormData = async () => {
    try {
      setLoading(true);

      const [nominee, allGames, allCategories] = await Promise.all([
        nomineeRepo.getNomineeById(id),
        gameRepo.getAllGames(),     // ✅ FIXED
        categoryRepo.getCategories() // ✅ FIXED
      ]);

      setGames(allGames);
      setCategories(allCategories);

      setSelectedGame(nominee.game._id);
      setSelectedCategory(nominee.category._id);

    } catch (err) {
      console.error(err);
      setError("Failed to load nominee information.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // nomineeRepo.updateNominee(id, newGameId, newCategoryId)
      await nomineeRepo.updateNominee(id, selectedGame, selectedCategory); // ✅ FIXED

      navigate("/nominees");
    } catch (err) {
      console.error(err);
      setError("Failed to save nominee.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <h2>Loading nominee...</h2>;

  return (
    <div>
      <h1>Edit Nominee</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        
        {/* Game dropdown */}
        <div>
          <label>Game:</label>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            required
          >
            <option value="">-- Select Game --</option>
            {games.map((g) => (
              <option key={g._id} value={g._id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>

        {/* Category dropdown */}
        <div style={{ marginTop: "10px" }}>
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/nominees")}
            style={{ marginLeft: "10px" }}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
