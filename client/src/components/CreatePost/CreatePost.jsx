import { useState } from "react";
import { createNewPost } from "../../utils/Post";
import { addNewPost } from "../../utils/Profile";
import { useUserData } from "../../utils/UserContext";
import Modal from "../Modal";
import "./CreatePost.css";

function CreatePost({ modalOn, setModalOn, appendNewPost }) {
  const userData = useUserData();
  const [content, setContent] = useState("");

  const handleCreatePost = () => {
    if (content === "") {
      alert("You gotta cluck about something!");
      return;
    }
    createNewPost(userData.user_id, content).then((res) => {
      appendNewPost(res);
      addNewPost(userData.user_id, res._id);
      setModalOn(false);
    });
  };

  return (
    <Modal modalOn={modalOn} setModalOn={setModalOn}>
      <div className="CreatePost">
        <h1 className="Title">Create Post</h1>
        <div className="Author">
          <img
            src={
              userData.pfp
                ? userData.pfp
                : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
            }
            alt="PFP"
          />
          <h1>{`${userData.first} ${userData.last}`}</h1>
        </div>
        <textarea
          className="Textbox"
          placeholder="What's clucking?"
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
        />
        <button
          className="CreatePostButton"
          onClick={() => {
            handleCreatePost();
          }}
        >
          Hatch a thought! 🥚
        </button>
      </div>
    </Modal>
  );
}

export default CreatePost;
