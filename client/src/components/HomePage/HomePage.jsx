import "./HomePage.css";
import { useState, useEffect, useCallback } from "react";
import Header from "../Header";
import Post from "../Post";
import CreatePost from "../CreatePost/";
import { getNewsFeed } from "../../utils/Post";

function HomePage({ userData, changeUser, setSearch }) {
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
    console.log(userData);
    loadNewsFeed();
  }, [userData, loadNewsFeed]);

  return userData ? (
    <div className="HomePage">
      <Header
        userData={userData}
        changeUser={changeUser}
        setSearch={setSearch}
      />
      <CreatePost
        userData={userData}
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
        {newsFeed.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default HomePage;
