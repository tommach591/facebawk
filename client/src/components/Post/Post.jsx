import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nFormatter } from "../../utils/helper";
import {
  createNewChild,
  deletePost,
  getPostChildren,
  likePost,
  unlikePost,
} from "../../utils/Post";
import { getProfile } from "../../utils/Profile";
import { useRefresh, useUser, useUserData } from "../../utils/UserContext";
import "./Post.css";
import Comment from "../Comment";

function Post({ post }) {
  const navigate = useNavigate();
  const user = useUser();
  const userData = useUserData();
  const refreshUserData = useRefresh();
  const [owner, setOwner] = useState({});
  const datePosted = new Date(post.date_created);
  const [likes, setLikes] = useState([...post.likes]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleDeletePost = () => {
    deletePost(post._id).then(() => refreshUserData());
  };

  useEffect(() => {
    getProfile(post.user_id).then((res) => {
      res ? setOwner(res) : setOwner({});
    });
    getPostChildren(post._id).then((res) => {
      if (res) {
        res.sort((a, b) => {
          const a_date = new Date(a.date_created);
          const b_date = new Date(b.date_created);
          return b_date - a_date;
        });
        setComments(res);
      } else setComments([]);
    });
  }, [post]);

  return Object.keys(owner).length > 0 ? (
    <div className="Post">
      {user === post.user_id ? (
        <div className="DeletePost" onClick={() => handleDeletePost()}>
          <img
            src={"https://api.iconify.design/ep:close-bold.svg?color=%23323232"}
            alt="X"
          />
        </div>
      ) : (
        <div />
      )}
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
          <h1
            className="Name User"
            onClick={() => {
              navigate(`/profile/?user=${post.user_id}`);
            }}
          >{`${owner.first} ${owner.last}`}</h1>
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
        <h1
          className="PostComment"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          {comments.length > 0
            ? `Comments (${nFormatter(comments.length, 2)})`
            : "Comment"}
        </h1>
      </div>
      {showComments ? (
        <div className="PostComments">
          <div className="Line" style={{ width: "95%" }} />
          <form
            className="WriteAComment"
            onSubmit={(event) => {
              event.preventDefault();
              if (newComment !== "") {
                createNewChild(post._id, user, newComment).then((res) => {
                  setComments([res, ...comments]);
                });
                setNewComment("");
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
              value={newComment}
              onChange={(event) => {
                setNewComment(event.currentTarget.value);
              }}
            />
          </form>
          {comments.length > 0 ? (
            <div className="ListOfComments">
              {comments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />;
              })}
            </div>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  ) : (
    <div />
  );
}

export default Post;
