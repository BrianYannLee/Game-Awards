import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryRepository from "../../data/categoryRepository";

function CategoryList() {
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

  const handleDelete = (id) => {
    navigate(`/categories/delete/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/categories/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-list">
      <h2>Categories</h2>

      <button onClick={() => navigate("/categories/create")}>
        Create New Category
      </button>

      {categories.length === 0 ? (
        <p>No categories found. Add a new category to get started.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="category-item">
              <div className="category-name">{category.name}</div>
              <div className="category-actions">
                <button onClick={() => handleView(category._id)}>View</button>
                <button onClick={() => handleEdit(category._id)}>Edit</button>
                <button onClick={() => handleDelete(category._id)}>
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

export default CategoryList;
