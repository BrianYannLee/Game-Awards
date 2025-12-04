import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryRepository from "../../data/categoryRepository";

function CreateCategory() {
  const navigate = useNavigate();
  const categoryRepository = new CategoryRepository();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await categoryRepository.createCategory(category);
      navigate("/categories");
    } catch (err) {
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-category">
      <h2>Create New Category</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={category.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Category"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/categories")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
