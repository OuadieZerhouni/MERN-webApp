import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const CommentSection = ({ token }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [prof, setProf] = useState([]);

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_DATABASE}/reunions/${
          window.location.pathname.split("/")[2]
        }/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(response.data.comments);
      setProf(response.data.user);
    } catch (error) {
      console.error(error);
    }
  }, [API_DATABASE, token]);

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(
        `${API_DATABASE}/reunions/${
          window.location.pathname.split("/")[2]
        }/comments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();

    const interval = setInterval(() => {
      fetchComments();
    }, 600000);

    return () => clearInterval(interval);
  }, [fetchComments]);

  const handleNewComment = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${API_DATABASE}/reunions/${
          window.location.pathname.split("/")[2]
        }/comments`,
        { comment: { value: newComment } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const sortedComments = useMemo(
    () =>
      [...comments].sort(
        (b,a) => Date.parse(a.date_comment) - Date.parse(b.date_comment)
      ),
    [comments]
  );

  return (
    <div className="Commment-section">
      <h2>Commentaire</h2>
      <form onSubmit={handleNewComment}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">
          <i class="fa-sharp fa-solid fa-paper-plane"></i>
        </button>
      </form>
      {sortedComments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.value} {prof === comment.professeur && (
            <i
              onClick={() => handleDeleteComment(comment._id)}
              class="fa-solid fa-square-xmark delete-comment"
            ></i>
          )}</p>{" "}
         
          <small>
            Posté Par {comment.date_comment.split("T")[0]} à{" "}
            {comment.date_comment.split("T")[1].split(".")[0]}
          </small>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
