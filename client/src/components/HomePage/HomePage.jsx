import "./HomePage.css";
import { useState, useEffect, useCallback } from "react";
import Post from "../Post";
import CreatePost from "../CreatePost/";
import { getNewsFeed } from "../../utils/Post";
import { useUserData } from "../../utils/UserContext";

function HomePage() {
  const userData = useUserData();

  const [modalOn, setModalOn] = useState(false);
  const [newsFeed, setNewsFeed] = useState([]);

  const loadNewsFeed = useCallback(() => {
    if (Object.keys(userData).length !== 0) {
      getNewsFeed(userData.user_id, userData.friends).then((res) => {
        if (res) {
          res.sort((a, b) => {
            const a_date = new Date(a.date_created);
            const b_date = new Date(b.date_created);
            return b_date - a_date;
          });
          setNewsFeed(res);
        }
      });
    }
  }, [userData]);

  let appendNewPost = (post) => {
    let newNewsFeed = [post, ...newsFeed];
    setNewsFeed(newNewsFeed);
  };

  useEffect(() => {
    loadNewsFeed();
  }, [userData, loadNewsFeed]);

  return userData ? (
    <div className="HomePage">
      <CreatePost
        modalOn={modalOn}
        setModalOn={setModalOn}
        appendNewPost={appendNewPost}
      />
      <div className="Content">
        <div
          className="Cluck"
          onClick={() => {
            setModalOn(true);
          }}
        >
          <div className="MainCluck">
            <img
              src={
                userData.pfp
                  ? userData.pfp
                  : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
              }
              alt="PFP"
            />
            <input type="text" placeholder="What's clucking?" disabled />
          </div>
          <div className="Line" style={{ width: "95%" }} />
        </div>
        {newsFeed.length > 0 ? (
          newsFeed.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        ) : (
          <h1 className="EmptyNewsFeed">
            Looks like you're new! Find your friends or post something!
          </h1>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default HomePage;
