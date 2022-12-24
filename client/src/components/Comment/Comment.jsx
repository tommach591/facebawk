import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nFormatter } from "../../utils/helper";
import { getProfile } from "../../utils/Profile";
import "./Comment.css";

function Comment({ comment }) {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([...comment.likes]);

  useEffect(() => {
    getProfile(comment.user_id).then((res) => {
      res ? setOwner(res) : setOwner({});
    });
  }, [comment]);

  return Object.keys(owner).length > 0 ? (
    <div className="Comment">
      <img
        src={
          owner.pfp
            ? owner.pfp
            : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
        }
        alt="PFP"
        onClick={() => {
          navigate(`/profile/?user=${comment.user_id}`);
        }}
      />
      <div className="CommentContent">
        <h1
          onClick={() => {
            navigate(`/profile/?user=${comment.user_id}`);
          }}
        >{`${owner.first} ${owner.last}`}</h1>
        <h2>{comment.content}</h2>
        <div className="CommentInteractions">
          <h2>Like</h2>
          <h2>Reply</h2>
        </div>
        {likes.length > 0 ? (
          <div className="CommentLikes">
            <img
              src="https://api.iconify.design/octicon:thumbsup-16.svg?color=%23646464"
              alt=""
            />
            <h2>{nFormatter(likes.length, 0)}</h2>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Comment;
