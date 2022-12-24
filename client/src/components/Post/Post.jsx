import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nFormatter } from "../../utils/helper";
import { likePost, unlikePost } from "../../utils/Post";
import { getProfile } from "../../utils/Profile";
import { useUser } from "../../utils/UserContext";
import "./Post.css";

function Post({ post }) {
  const navigate = useNavigate();
  const user = useUser();
  const [owner, setOwner] = useState({});
  const datePosted = new Date(post.date_created);
  const [likes, setLikes] = useState([...post.likes]);
  const [replies, setReplies] = useState([...post.replies]);

  useEffect(() => {
    getProfile(post.user_id).then((res) => {
      res ? setOwner(res) : setOwner({});
    });
  }, [post]);

  return Object.keys(owner).length !== 0 ? (
    <div className="Post">
      <div className="Author">
        <img
          src={
            owner.pfp
              ? owner.pfp
              : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
          }
          alt="PFP"
          onClick={() => {
            navigate(`/profile/?user=${post.user_id}`);
          }}
        />
        <div className="PostInfo">
          {Object.keys(owner).length !== 0 ? (
            <h1
              className="Name User"
              onClick={() => {
                navigate(`/profile/?user=${post.user_id}`);
              }}
            >{`${owner.first} ${owner.last}`}</h1>
          ) : (
            <h1 className="Name">Anonymous User</h1>
          )}
          <h1 className="Date">{datePosted.toDateString()}</h1>
        </div>
      </div>
      <h1 className="PostContent">{post.content}</h1>
      {likes.length > 0 ? (
        <div className="PostLikes">
          <img
            src="https://api.iconify.design/octicon:thumbsup-16.svg?color=%23646464"
            alt=""
          />
          <h2>{nFormatter(likes.length, 2)}</h2>
        </div>
      ) : (
        <div />
      )}
      <div className="Line" style={{ width: "95%" }} />
      <div className="PostInteractions">
        {likes.includes(user) ? (
          <h1
            className="PostLike"
            onClick={() => {
              let newLikes = [...likes];
              newLikes.splice(newLikes.indexOf(user), 1);
              setLikes(newLikes);
              unlikePost(post._id, user);
            }}
          >
            {`Unlike`}
          </h1>
        ) : (
          <h1
            className="PostLike"
            onClick={() => {
              setLikes([...likes, user]);
              likePost(post._id, user);
            }}
          >
            {`Like`}
          </h1>
        )}
        <h1 className="PostComment">
          {replies.length > 0
            ? `Comments (${nFormatter(replies.length, 2)})`
            : "Comment"}
        </h1>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Post;
