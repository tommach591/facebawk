import "./SearchPage.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllProfile,
  getSearch,
  makeFriendRequest,
  removeFriend,
} from "../../utils/Profile";
import { useUser } from "../../utils/UserContext";

function SearchPage() {
  const user = useUser();

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [found, setFound] = useState([]);
  const [reload, setReload] = useState(false);

  let handleUnfriend = (friend) => {
    removeFriend(user, friend).then((res) => {
      removeFriend(friend, user).then((res) => {
        setReload(true);
      });
    });
  };

  useEffect(() => {
    if (query !== "") {
      getSearch(query).then((res) => {
        res ? setFound(res) : setFound([]);
        setReload(false);
      });
    } else {
      getAllProfile().then((res) => {
        res ? setFound(res) : setFound([]);
        setReload(false);
      });
    }
  }, [query, reload]);

  return (
    <div className="SearchPage">
      <div className="ListOfFoundUsers">
        {found.length > 0 ? (
          found.map((profileData) => {
            return (
              <div className="FoundUsers" key={profileData.user_id}>
                <img
                  src={
                    profileData.pfp
                      ? profileData.pfp
                      : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
                  }
                  alt=""
                  onClick={() => {
                    navigate(`/profile/?user=${profileData.user_id}`);
                  }}
                />
                <div className="UserInfo">
                  <h1
                    className="UserName"
                    onClick={() => {
                      navigate(`/profile/?user=${profileData.user_id}`);
                    }}
                  >{`${profileData.first} ${profileData.last}`}</h1>
                  <h1 className="FriendCount">{`${profileData.friends.length} friends`}</h1>
                </div>
                {profileData.user_id !== user ? (
                  <button
                    className="AddFriend AtSearchPage"
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
                ) : (
                  <div />
                )}
                {profileData.friends.includes(user) ? (
                  <button
                    className="Unfriend AtSearch"
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
            );
          })
        ) : (
          <h1 className="Nothing">No one found :(</h1>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
