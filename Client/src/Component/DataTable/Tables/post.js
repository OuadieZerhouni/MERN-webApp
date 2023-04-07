import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DepartementTable({
  activeTab,
  posts,
  handleDeletePost,
  _departement = false,
  IsAdmin = false,
  ShowInfo,
}) {
  return (
    <div className="table-container">
      {activeTab === "posts" && (
        <>
          {IsAdmin || _departement ? (
            <Link to="/Add/Post">
              <button className="Insert-Btn">Insérer un poste</button>
            </Link>
          ) : (
            <></>
          )}
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Date de création</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>
                    {post.text.length > 50 ? (
                      <>
                        {post.text.substring(0, 50)}...
                        <p
                          style={{
                            display: "inline",
                            cursor: "pointer",
                            color: "blue",
                          }}
                          onClick={() => ShowInfo(post.title, post.text)}
                        >
                          Voir plus
                        </p>
                      </>
                    ) : (
                      post.text
                    )}
                  </td>

                  <td>{post.date.substring(0, 10)}</td>
                <td>
                  <Link to={post.image} target="_blank">
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ height: "50px" }}
                    />
                  </Link>
                </td>
                  {post._id === _departement["_id"] || IsAdmin ? (
                    <td>
                      {IsAdmin ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeletePost(post._id);
                          }}
                          
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DepartementTable;
