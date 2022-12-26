import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nFormatter } from "../../utils/helper";
import { deletePost, likePost, unlikePost } from "../../utils/Post";
import { getProfile } from "../../utils/Profile";
import { useRefresh, useUser } from "../../utils/UserContext";
import "./Reply.css";

function Reply({ reply }) {
  const navigate = useNavigate();
  const user = useUser();
  const refreshUserData = useRefresh();
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([...reply.likes]);

  const handleDeletePost = () => {
    deletePost(reply._id).then(() => refreshUserData());
  };

  useEffect(() => {
    getProfile(reply.user_id).then((res) => {
      res ? setOwner(res) : setOwner({});
    });
  }, [reply]);

  return Object.keys(owner).length > 0 ? (
    <div className="Reply">
      <div className="ReplyBubble">
        {user === reply.user_id ? (
          <div className="DeleteReply" onClick={() => handleDeletePost()}>
            <img
              src={
                "https://api.iconify.design/ep:close-bold.svg?color=%23323232"
              }
              alt="X"
            />
          </div>
        ) : (
          <div />
        )}
        <img
          src={
            owner.pfp
              ? owner.pfp
              : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
          }
          alt="PFP"
          onClick={() => {
            navigate(`/profile/?user=${reply.user_id}`);
          }}
        />
        <div className="ReplyContent">
          <h1
            onClick={() => {
              navigate(`/profile/?user=${reply.user_id}`);
            }}
          >{`${owner.first} ${owner.last}`}</h1>
          <h2>{reply.content}</h2>
        </div>
        {likes.length > 0 ? (
          <div className="ReplyLikes">
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
      <div className="ReplyInteractions">
        {likes.includes(user) ? (
          <h1
            onClick={() => {
              let newLikes = [...likes];
              newLikes.splice(newLikes.indexOf(user), 1);
              setLikes(newLikes);
              unlikePost(reply._id, user);
            }}
          >
            {`Unlike`}
          </h1>
        ) : (
          <h1
            onClick={() => {
              setLikes([...likes, user]);
              likePost(reply._id, user);
            }}
          >
            {`Like`}
          </h1>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Reply;
