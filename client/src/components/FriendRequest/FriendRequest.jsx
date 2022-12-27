import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addFriend,
  declineFriendRequest,
  getProfile,
} from "../../utils/Profile";
import { useUser, useRefresh } from "../../utils/UserContext";
import "./FriendRequest.css";

function FriendRequest({ id }) {
  const navigate = useNavigate();
  const user = useUser();
  const refreshUserData = useRefresh();
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile(id).then((res) => {
      res ? setProfile(res) : setProfile({});
    });
  }, [id]);

  return profile ? (
    <div className="FriendRequest">
      <img
        src={
          profile.pfp
            ? profile.pfp
            : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
        }
        alt=""
        onClick={() => {
          navigate(`/profile/?user=${profile.user_id}`);
        }}
      />
      <div className="UserInfo">
        <h1
          className="UserName"
          onClick={() => {
            navigate(`/profile/?user=${profile.user_id}`);
          }}
        >{`${profile.first} ${profile.last}`}</h1>
        <h1 className="FriendCount">{`${profile.friends.length} friends`}</h1>
      </div>
      <div className="FriendRequestButtonContainer">
        <button
          className="FriendRequestButton Accept"
          onClick={() => {
            addFriend(user, id).then((res) => {
              addFriend(id, user).then((res) => {
                refreshUserData();
              });
            });
          }}
        >
          <h2>Accept</h2>
          <img
            src="https://api.iconify.design/akar-icons:person-check.svg?color=%23ffffff"
            alt=""
          />
        </button>
        <button
          className="FriendRequestButton Decline"
          onClick={() => {
            declineFriendRequest(user, id).then((res) => {
              refreshUserData();
            });
          }}
        >
          <h2>Decline</h2>
          <img
            src="https://api.iconify.design/akar-icons:person-cross.svg?color=%23ffffff"
            alt=""
          />
        </button>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default FriendRequest;
