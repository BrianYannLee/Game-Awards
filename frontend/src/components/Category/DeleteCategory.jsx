import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import CategoryRepository from "../../data/categoryRepository";

export default function DeleteCategory() {
  const { id } = useParams(); // categoryId
  const navigate = useNavigate();
  const categoryRepo = new CategoryRepository();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryRepo.getCategoryById(id);
        setCategory(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      setDeleting(true);
      await categoryRepo.deleteCategory(id);
      navigate("/categories"); // back to category list
    } catch (err) {
      console.error(err);
      setError("Failed to delete category.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/category/${id}`);
  };

  if (loading) return <div>Loading category...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="delete-category">
      <h2>Delete Category</h2>
      <p>Are you sure you want to delete the category "<strong>{category.name}</strong>"?</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleDelete} disabled={deleting} style={{ color: "white", backgroundColor: "red" }}>
          {deleting ? "Deleting..." : "Yes, Delete"}
        </button>
        <button onClick={handleCancel} style={{ marginLeft: "10px" }} disabled={deleting}>
          Cancel
        </button>
      </div>
    </div>
  );
}
