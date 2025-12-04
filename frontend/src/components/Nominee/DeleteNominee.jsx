import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NomineeRepository from "../../data/nomineeRepository";

export default function DeleteNominee() {
  const { categoryId, categoryName } = useParams(); // passed from NomineeList
  const navigate = useNavigate();
  const nomineeRepo = new NomineeRepository();

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const [nomineesInCategory, setNomineesInCategory] = useState([]);

  useEffect(() => {
    const loadNominees = async () => {
      try {
        const allNominees = await nomineeRepo.getAllNominees();
        const filtered = allNominees.filter(
          (n) => n.category._id === categoryId
        );
        setNomineesInCategory(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load nominees for this category");
      } finally {
        setLoading(false);
      }
    };
    loadNominees();
  }, [categoryId]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      for (let n of nomineesInCategory) {
        await nomineeRepo.deleteNominee(n._id); // use nominee _id here
      }
      navigate("/nominee");
    } catch (err) {
      console.error(err);
      setError("Failed to delete nominees");
      setDeleting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete all nominees in category{" "}
        <strong>{categoryName}</strong>? This cannot be undone.
      </p>
      <div>
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete Nominees"}
        </button>
        <button
          onClick={() => navigate("/nominee")}
          style={{ marginLeft: "10px" }}
          disabled={deleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
