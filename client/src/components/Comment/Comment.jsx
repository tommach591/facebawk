import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nFormatter } from "../../utils/helper";
import {
  likePost,
  unlikePost,
  getPostChildren,
  createNewChild,
  deletePost,
} from "../../utils/Post";
import { getProfile } from "../../utils/Profile";
import { useUser, useUserData, useRefresh } from "../../utils/UserContext";
import Reply from "../Reply";
import "./Comment.css";

function Comment({ comment }) {
  const navigate = useNavigate();
  const user = useUser();
  const userData = useUserData();
  const refreshUserData = useRefresh();
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([...comment.likes]);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");

  const handleDeletePost = () => {
    deletePost(comment._id).then(() => refreshUserData());
  };

  useEffect(() => {
    getProfile(comment.user_id).then((res) => {
      res ? setOwner(res) : setOwner({});
    });
    getPostChildren(comment._id).then((res) => {
      if (res) {
        res.sort((a, b) => {
          const a_date = new Date(a.date_created);
          const b_date = new Date(b.date_created);
          return a_date - b_date;
        });
        setReplies(res);
      } else setReplies([]);
    });
  }, [comment]);

  return Object.keys(owner).length > 0 ? (
    <div className="Comment">
      <div className="CommentBubble">
        {user === comment.user_id ? (
          <div className="DeleteComment" onClick={() => handleDeletePost()}>
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
      <div className="CommentInteractions">
        {likes.includes(user) ? (
          <h1
            onClick={() => {
              let newLikes = [...likes];
              newLikes.splice(newLikes.indexOf(user), 1);
              setLikes(newLikes);
              unlikePost(comment._id, user);
            }}
          >
            {`Unlike`}
          </h1>
        ) : (
          <h1
            onClick={() => {
              setLikes([...likes, user]);
              likePost(comment._id, user);
            }}
          >
            {`Like`}
          </h1>
        )}
        <h1
          className="CommentReply"
          onClick={() => {
            setShowReplies(!showReplies);
          }}
        >
          {replies.length > 0
            ? `Replies (${nFormatter(replies.length, 2)})`
            : "Reply"}
        </h1>
      </div>
      {showReplies ? (
        <div className="CommentReplies">
          {replies.length > 0 ? (
            <div className="ListOfReplies">
              {replies.map((reply) => {
                return <Reply key={reply._id} reply={reply} />;
              })}
            </div>
          ) : (
            <div />
          )}
          <form
            className="WriteAReply"
            onSubmit={(event) => {
              event.preventDefault();
              if (newReply !== "") {
                createNewChild(comment._id, user, newReply).then((res) => {
                  setReplies([...replies, res]);
                });
                setNewReply("");
              }
            }}
          >
            <img
              src={
                userData.pfp
                  ? userData.pfp
                  : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
              }
              alt="PFP"
            />
            <input
              type="text"
              placeholder="Cluck a response?"
              value={newReply}
              onChange={(event) => {
                setNewReply(event.currentTarget.value);
              }}
            />
          </form>
        </div>
      ) : (
        <div />
      )}
    </div>
  ) : (
    <div />
  );
}

export default Comment;
