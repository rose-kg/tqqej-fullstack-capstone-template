import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailsPage.css";
import urlConfig from "../../config/urlConfig";

function DetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [gift, setGift] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  // ✅ Task 1: Check authentication
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/app/login");
    }
  }, [navigate]);

  // ✅ Task 2 & 3: Fetch gift details + scroll to top
  useEffect(() => {
    const fetchGiftDetails = async () => {
      try {
        const response = await fetch(
          `${urlConfig.backendUrl}/api/gifts/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch gift details");
        }
        const data = await response.json();
        setGift(data);
        setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      }
    };

    window.scrollTo(0, 0);
    fetchGiftDetails();
  }, [productId]);

  // ✅ Task 4: Handle Back Click
  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
        <button className="btn btn-secondary mt-3" onClick={handleBack}>
          Go Back
        </button>
      </div>
    );
  }

  if (!gift) {
    return <div className="container mt-5 text-center">Loading gift details...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h2 className="details-title">{gift.name}</h2>
        </div>
        <div className="card-body">
          <div className="image-placeholder-large mb-4">
            {gift.image ? (
              <img
                src={gift.image}
                alt={gift.name}
                className="product-image-large"
              />
            ) : (
              <div className="no-image-available-large">
                No Image Available
              </div>
            )}
          </div>

          <p><strong>Category:</strong> {gift.category}</p>
          <p><strong>Condition:</strong> {gift.condition}</p>
          <p><strong>Date Added:</strong> {gift.dateAdded}</p>
          <p><strong>Age:</strong> {gift.age}</p>
          <p><strong>Description:</strong> {gift.description}</p>

          <button className="btn btn-secondary mt-3" onClick={handleBack}>
            Back
          </button>

          {/* ✅ Task 7: Render Comments */}
          <div className="comments-section mt-5">
            <h4>Comments</h4>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="card p-3">
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
