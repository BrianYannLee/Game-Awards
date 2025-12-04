import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NomineeRepository from "../../data/nomineeRepository";

export default function DeleteNominee() {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();
  const nomineeRepo = new NomineeRepository();

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Just a fake load to show the confirmation page
    setLoading(false);
  }, []);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      // Delete all nominees in this category
      const nominees = await nomineeRepo.getAllNominees();
      const toDelete = nominees.filter((n) => n.category._id === categoryId);

      for (let n of toDelete) {
        await nomineeRepo.deleteNominee(n.game._id, categoryId);
      }

      navigate("/nominee"); // back to NomineeList
    } catch (err) {
      console.error(err);
      setError("Failed to delete Nominee");
      setDeleting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete the Nominee{" "}
        <strong>{categoryName}</strong>? This will remove all nominees in this
        category. This action cannot be undone.
      </p>

      <div>
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete Nominee"}
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
