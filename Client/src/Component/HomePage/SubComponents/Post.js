import React from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer"; // Import the useInView hook

export default function Post() {
  const [posts, setPosts] = React.useState([]);

  const API_Database = process.env.REACT_APP_API_DATABASE;

  React.useEffect(() => {
    axios
      .get(`${API_Database}/post`,{},
        {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div className='post-cont' ref={ref} >
      {posts.map((post) => {return (
        <div key={post} className={`post ${inView ? "animate" : ""}`} >
          <div className="post-title">
            <p>{post.title+'\n'}</p>
          </div>
          <p> {"at : "+post.date.split("T")[0]}</p>

            <div className="post-inside">
          <div className="post-img">
            <img src={post.image} alt="post-img" />
          </div>
          <div className="post-text">
            <p>{post.text}</p>
          </div>
            </div>  
            <hr />

        </div> )
      })}
    </div>
  );
}
