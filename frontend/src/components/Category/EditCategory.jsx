import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import CategoryRepository from "../../data/categoryRepository";

export default function EditCategory() {
  const { id } = useParams(); // categoryId
  const navigate = useNavigate();
  const categoryRepo = new CategoryRepository();

  const [category, setCategory] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryRepo.getCategoryById(id);
        setCategory({ name: data.name, description: data.description || "" });
      } catch (err) {
        console.error(err);
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await categoryRepo.updateCategory(id, {
        name: category.name,
        description: category.description,
      });
      navigate(`/category/${id}`); // redirect to category detail
    } catch (err) {
      console.error(err);
      setError("Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading category...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="edit-category">
      <h2>Edit Category</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/category/${id}`)}
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
