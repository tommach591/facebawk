import { useEffect } from "react";
import { useState } from "react";
import { getProfile } from "../../utils/Profile";
import "./Post.css";

function Post({ post }) {
  const [owner, setOwner] = useState();
  const [datePosted, setDatePosted] = useState();
  const now = new Date(Date.now());

  useEffect(() => {
    getProfile(post.user_id).then((res) => {
      setOwner(res);
    });

    const newDate = new Date(post.date_created);
    setDatePosted(newDate);
  }, [post]);

  return owner ? (
    <div className="Post">
      <div className="Author">
        <img
          src={
            "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
          }
          alt="PFP"
        />
        <div className="PostInfo">
          <h1 className="Name">{`${owner.first} ${owner.last}`}</h1>
          <h1 className="Date">{datePosted.toDateString()}</h1>
        </div>
      </div>
      <h1 className="PostContent">{post.content}</h1>
      <div className="Line" style={{ width: "95%" }} />
      <div className="PostInteractions">
        <h1 className="PostLike">Like</h1>
        <h1 className="PostComment">Comment</h1>
        {post.user_id !== owner.user_id ? (
          <div />
        ) : (
          <h1 className="PostShare">Share</h1>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Post;
