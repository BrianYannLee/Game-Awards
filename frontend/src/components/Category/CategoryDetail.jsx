import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import CategoryRepository from "../../data/categoryRepository";

function CategoryDetail() {
  const { id } = useParams();       // categoryId
  const navigate = useNavigate();
  const categoryRepo = new CategoryRepository();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryRepo.getCategoryById(id);
        setCategory(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load category details");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const handleEdit = () => {
    navigate(`/category/edit/${id}`);
  };

  const handleDelete = () => {
    navigate(`/category/delete/${id}`);
  };

  const handleBack = () => {
    navigate("/categories");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="category-details">
      <h2>{category.name}</h2>
      {category.description && <p>Description: {category.description}</p>}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
          Delete
        </button>
        <button onClick={handleBack} style={{ marginLeft: "10px" }}>
          Back to List
        </button>
      </div>
    </div>
  );
}

export default CategoryDetail;
