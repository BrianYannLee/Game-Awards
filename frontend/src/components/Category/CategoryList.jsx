import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryRepository from "../../data/categoryRepository";

export default function CategoryList() {
  const navigate = useNavigate();
  const categoryRepository = new CategoryRepository();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryRepository.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => navigate(`/category/${id}`);
  const handleEdit = (id) => navigate(`/category/edit/${id}`);
  const handleDelete = (id) => navigate(`/category/delete/${id}`);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-list">
      <h2>Categories</h2>

      <button
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/categories/create")}
      >
        Create New Category
      </button>

      {categories.length === 0 ? (
        <p>No categories found. Add a new category to get started.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((category) => (
            <li
              key={category._id}
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
              <span>{category.name}</span>
              <div>
                <button onClick={() => handleView(category._id)}>View</button>
                <button
                  onClick={() => handleEdit(category._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
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
