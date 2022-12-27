import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getPostByUser } from "../../utils/Post";
import {
  getFriends,
  getProfile,
  makeFriendRequest,
  removeFriend,
} from "../../utils/Profile";
import CreatePost from "../CreatePost";
import EditDetails from "../EditDetails";
import Post from "../Post";
import "./ProfilePage.css";
import { useUser } from "../../utils/UserContext";

function ProfilePage() {
  const user = useUser();

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("user");
  const isOwner = user === id;
  const [profileData, setProfileData] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);
  const [postModalOn, setPostModalOn] = useState(false);
  const [editDetailsModalOn, setEditDetailsModalOn] = useState(false);
  const [reload, setReload] = useState(false);
  const [friends, setFriends] = useState([]);

  const [showIntro, setShowIntro] = useState(true);
  const [showFriends, setShowFriends] = useState(true);

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
  };

  let handleUnfriend = (friend) => {
    removeFriend(user, friend).then((res) => {
      removeFriend(friend, user).then((res) => {
        setReload(true);
      });
    });
  };

  useEffect(() => {
    getProfile(id).then((res) => {
      if (res) setProfileData(res);
      else navigate(`/profile/?user=${user}`);
    });
  }, [id, navigate, user, reload]);

  useEffect(() => {
    loadUserPosts();
    getFriends(profileData.user_id).then((res) => {
      res ? setFriends(res) : setFriends([]);
    });
  }, [profileData, loadUserPosts]);

  return Object.keys(profileData).length !== 0 ? (
    <div className="ProfilePage">
      {isOwner ? (
        <CreatePost
          modalOn={postModalOn}
          setModalOn={setPostModalOn}
          appendNewPost={appendNewPost}
        />
      ) : (
        <div />
      )}
      {isOwner ? (
        <EditDetails
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
        <h1 className="DisplayFriendCount">{`${profileData.friends.length} friends`}</h1>
        {isOwner ? (
          <div />
        ) : (
          <button
            className="AddFriend AtProfilePage"
            disabled={
              profileData.friends.includes(user) ||
              profileData.friend_requests.includes(user)
            }
            onClick={(event) => {
              makeFriendRequest(profileData.user_id, user);
              setReload(true);
              alert("Request Sent!");
            }}
            style={
              profileData.friends.includes(user)
                ? { background: "rgb(80, 225, 90)" }
                : profileData.friend_requests.includes(user)
                ? { background: "rgb(189, 189, 189)" }
                : { background: "rgb(92, 92, 92)" }
            }
          >
            <h2>
              {profileData.friends.includes(user)
                ? "Friends"
                : profileData.friend_requests.includes(user)
                ? "Request Sent"
                : "Add Friend"}
            </h2>
            <img
              src={
                profileData.friends.includes(user)
                  ? "https://api.iconify.design/ic:baseline-person.svg?color=%23ffffff"
                  : profileData.friend_requests.includes(user)
                  ? "https://api.iconify.design/mdi:account-check.svg?color=%23ffffff"
                  : "https://api.iconify.design/ic:baseline-person-add-alt-1.svg?color=%23ffffff"
              }
              alt=""
            />
          </button>
        )}
        {profileData.friends.includes(user) ? (
          <button
            className="Unfriend AtPFP"
            onClick={() => {
              handleUnfriend(profileData.user_id);
            }}
          >
            <h2>Unfriend</h2>
            <img
              src="https://api.iconify.design/ic:baseline-person-remove.svg?color=%23FFFFFF"
              alt=""
            />
          </button>
        ) : (
          <div />
        )}
      </div>
      <div className="ProfileContent">
        <div className="ProfileLeft">
          <div className="AboutMe">
            <div
              className="Heading"
              onClick={() => {
                setShowIntro(!showIntro);
              }}
            >
              <h1>Intro</h1>
              <div className={showIntro ? "Arrow Up" : "Arrow Down"} />
              <div className="Line" style={{ width: "100%" }} />
            </div>
            {showIntro ? (
              <div>
                {profileData.bio !== "" ? (
                  <div className="Bio">
                    <h2>{profileData.bio}</h2>
                    <div className="Line" style={{ width: "100%" }} />
                  </div>
                ) : (
                  <div />
                )}

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
            ) : (
              <div />
            )}
          </div>
          <div className="ProfileFriends">
            <div
              className="Heading"
              onClick={() => {
                setShowFriends(!showFriends);
              }}
            >
              <h1>{`Friends (${friends.length})`}</h1>
              <div className={showFriends ? "Arrow Up" : "Arrow Down"} />
              <div className="Line" style={{ width: "100%" }} />
            </div>
            {showFriends ? (
              <div className="FriendList">
                <div className="FriendGrid">
                  {friends.map((friend) => {
                    return (
                      <div
                        key={friend.user_id}
                        className="Friend"
                        onClick={() => {
                          navigate(`/profile/?user=${friend.user_id}`);
                        }}
                      >
                        <img
                          src={
                            friend.pfp
                              ? friend.pfp
                              : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
                          }
                          alt="PFP"
                        />
                        <h2>{`${friend.first} ${friend.last}`}</h2>
                      </div>
                    );
                  })}
                </div>
              </div>
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
