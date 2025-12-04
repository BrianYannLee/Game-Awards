import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryRepository from "../../data/categoryRepository";
import GameRepository from "../../data/gameRepository";
import NomineeRepository from "../../data/nomineeRepository";

export default function CreateNominee() {
  const categoryRepo = new CategoryRepository();
  const gameRepo = new GameRepository();
  const nomineeRepo = new NomineeRepository();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const catData = await categoryRepo.getCategories();
      setCategories(catData);

      const gameData = await gameRepo.getAllGames();
      setGames(gameData);
    };
    loadData();
  }, []);

  const handleAddNominee = async () => {
    if (!selectedCategory || !selectedGame) return;

    await nomineeRepo.createNominee(selectedGame, selectedCategory);
    navigate("/nominee"); // go back to list after creation
  };

  return (
    <div>
      <h2>Add a Nominee</h2>

      <label>Category: </label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">--Select Category--</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <br />

      <label>Game: </label>
      <select
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">--Select Game--</option>
        {games.map((g) => (
          <option key={g._id} value={g._id}>{g.title}</option>
        ))}
      </select>

      <br />
      <button onClick={handleAddNominee} disabled={!selectedCategory || !selectedGame}>
        Add Nominee
      </button>
      <button onClick={() => navigate("/nominee")} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
