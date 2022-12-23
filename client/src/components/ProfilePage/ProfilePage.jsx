import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getPostByUser } from "../../utils/Post";
import { getProfile } from "../../utils/Profile";
import CreatePost from "../CreatePost";
import EditDetails from "../EditDetails";
import Post from "../Post";
import "./ProfilePage.css";
import { useRefresh, useUser, useUserData } from "../../utils/UserContext";

function ProfilePage() {
  const user = useUser();
  const userData = useUserData();
  const refreshUserData = useRefresh();

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("user");
  const isOwner = user === id;
  const [profileData, setProfileData] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);
  const [postModalOn, setPostModalOn] = useState(false);
  const [editDetailsModalOn, setEditDetailsModalOn] = useState(false);

  const loadUserPosts = useCallback(() => {
    if (Object.keys(profileData).length !== 0) {
      getPostByUser(profileData.user_id).then((res) => {
        if (res) {
          res.sort((a, b) => {
            const a_date = new Date(a.date_created);
            const b_date = new Date(b.date_created);
            return b_date - a_date;
          });
          setProfilePosts(res);
        }
      });
    }
  }, [profileData]);

  let appendNewPost = (post) => {
    let newProfilePosts = [post, ...profilePosts];
    setProfilePosts(newProfilePosts);
  };

  let updateProfile = (newProfile) => {
    setProfileData(newProfile);
    refreshUserData();
  };

  useEffect(() => {
    getProfile(id).then((res) => {
      if (res) setProfileData(res);
      else navigate(`/profile/?user=${user}`);
    });
  }, [id, navigate, user]);

  useEffect(() => {
    loadUserPosts();
  }, [profileData, loadUserPosts]);

  return Object.keys(profileData).length !== 0 ? (
    <div className="ProfilePage">
      {isOwner ? (
        <CreatePost
          userData={userData}
          modalOn={postModalOn}
          setModalOn={setPostModalOn}
          appendNewPost={appendNewPost}
        />
      ) : (
        <div />
      )}
      {isOwner ? (
        <EditDetails
          userData={userData}
          modalOn={editDetailsModalOn}
          setModalOn={setEditDetailsModalOn}
          updateProfile={updateProfile}
        />
      ) : (
        <div />
      )}
      <div className="Display">
        <div className="BannerPicture">
          {profileData.banner !== "" ? (
            <img src={profileData.banner} alt="" />
          ) : (
            <div />
          )}
        </div>
        <div className="ProfilePicture">
          <img
            src={
              profileData.pfp
                ? profileData.pfp
                : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
            }
            alt="PFP"
          />
        </div>
        <h1 className="DisplayName">{`${profileData.first} ${profileData.last}`}</h1>
        {isOwner ? (
          <div />
        ) : (
          <button className="AddFriend">
            <h2>Add Friend</h2>
            <img
              src="https://api.iconify.design/ic:baseline-person-add-alt-1.svg?color=%23ffffff"
              alt=""
            />
          </button>
        )}
      </div>
      <div className="ProfileContent">
        <div className="AboutMe">
          <h1>Intro</h1>
          <div className="Bio">
            {profileData.bio !== "" ? <h2>{profileData.bio}</h2> : <div />}
          </div>
          <div className="DetailsContainer">
            {profileData.work !== "" ? (
              <h2 className="Detail">
                <img
                  src={
                    "https://api.iconify.design/material-symbols:work.svg?color=%235c5c5c"
                  }
                  alt={""}
                />
                {profileData.work}
              </h2>
            ) : (
              <div />
            )}
            {profileData.education !== "" ? (
              <h2 className="Detail">
                <img
                  src={
                    "https://api.iconify.design/fa6-solid:graduation-cap.svg?color=%235c5c5c"
                  }
                  alt={""}
                />
                {profileData.education}
              </h2>
            ) : (
              <div />
            )}
            {profileData.city !== "" ? (
              <h2 className="Detail">
                <img
                  src={
                    "https://api.iconify.design/majesticons:location-marker.svg?color=%235c5c5c"
                  }
                  alt={""}
                />
                {profileData.city}
              </h2>
            ) : (
              <div />
            )}
            {profileData.hometown !== "" ? (
              <h2 className="Detail">
                <img
                  src={
                    "https://api.iconify.design/ic:round-home.svg?color=%235c5c5c"
                  }
                  alt={""}
                />
                {profileData.hometown}
              </h2>
            ) : (
              <div />
            )}
            {profileData.relationship !== "" ? (
              <h2 className="Detail">
                <img
                  src={
                    "https://api.iconify.design/ph:heart-fill.svg?color=%235c5c5c"
                  }
                  alt={""}
                />
                {profileData.relationship}
              </h2>
            ) : (
              <div />
            )}
          </div>
          <div className="EditDetailsButtonContainer">
            {isOwner ? (
              <button
                onClick={() => {
                  setEditDetailsModalOn(true);
                }}
              >
                Edit Details
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="Interactions">
          {isOwner ? (
            <div
              className="Cluck"
              onClick={() => {
                setPostModalOn(true);
              }}
            >
              <div className="MainCluck">
                <img
                  src={
                    profileData.pfp
                      ? profileData.pfp
                      : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
                  }
                  alt="PFP"
                />
                <input type="text" placeholder="What's clucking?" disabled />
              </div>
              <div className="Line" style={{ width: "95%" }} />
            </div>
          ) : (
            <div />
          )}
          {profilePosts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default ProfilePage;
