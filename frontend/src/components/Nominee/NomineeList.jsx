import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NomineeRepository from "../../data/nomineeRepository";
import CategoryRepository from "../../data/categoryRepository";

export default function NomineeList() {
  const nomineeRepo = new NomineeRepository();
  const categoryRepo = new CategoryRepository();
  const navigate = useNavigate();

  const [nominees, setNominees] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNominees();
    loadCategories();
  }, []);

  const loadNominees = async () => {
    setLoading(true);

    try {
      const data = await nomineeRepo.getAllNominees();

      const grouped = {};
      data.forEach((nom) => {
        const categoryName = nom.category.name;

        if (!grouped[categoryName]) {
          grouped[categoryName] = {
            categoryId: nom.category._id,
            games: [],
          };
        }

        grouped[categoryName].games.push({
          nomineeId: nom._id,
          gameId: nom.game._id,
          title: nom.game.title,
        });
      });

      setNominees(grouped);
    } catch (err) {
      console.error("Failed to load nominees", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryRepo.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const handleRemoveGame = async (nomineeId) => {
    try {
      await nomineeRepo.deleteNominee(nomineeId);
      loadNominees();
    } catch (err) {
      console.error("Failed to delete nominee", err);
    }
  };

  if (loading) return <h3>Loading...</h3>;

  const categoryNames = Object.keys(nominees);

  return (
    <div>
      <h1>🏆 Game Awards Nominees</h1>

      {categoryNames.length === 0 && <p>No nominees yet.</p>}

      {categoryNames.map((categoryName) => {
        const category = nominees[categoryName];

        return (
          <div key={categoryName} className="category-section">
            <h2>{categoryName}</h2>

            <ul>
              {category.games.map((g) => (
                <li key={g.noimeeId}>
                  {g.title}{" "}
                  <button
                    onClick={() => handleRemoveGame(g.nomineeId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="buttons">
              <button
                onClick={() =>
                  navigate(`/nominee/delete/${category.categoryId}`)
                }
              >
                Delete Nominee
              </button>
            </div>

            <hr />
          </div>
        );
      })}

      {/* Add Entirely New Nominee */}
      <div style={{ marginTop: "40px" }}>
        <h3>Create New Nominee</h3>
        <button onClick={() => navigate("/nominee/create")}>
          Add New Nominee
        </button>
      </div>
    </div>
  );
}
