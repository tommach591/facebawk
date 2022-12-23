import "./SearchPage.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearch, makeFriendRequest } from "../../utils/Profile";
import { useUser } from "../../utils/UserContext";

function SearchPage() {
  const user = useUser();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [found, setFound] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getSearch(query).then((res) => {
      res ? setFound(res) : setFound([]);
      setReload(false);
    });
  }, [query, reload]);

  return (
    <div className="SearchPage">
      <div className="ListOfFoundUsers">
        {found.length > 0 ? (
          found.map((profile) => {
            return (
              <div className="FoundUsers" key={profile.user_id}>
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
                {profile.user_id !== user ? (
                  <button
                    className="AddFoundUser"
                    disabled={
                      profile.friends.includes(user) ||
                      profile.friend_requests.includes(user)
                    }
                    onClick={(event) => {
                      makeFriendRequest(profile.user_id, user);
                      setReload(true);
                      alert("Request Sent!");
                    }}
                  >
                    <h2>
                      {profile.friends.includes(user)
                        ? "Friends"
                        : profile.friend_requests.includes(user)
                        ? "Request Sent"
                        : "Add Friend"}
                    </h2>
                    <img
                      src={
                        profile.friends.includes(user)
                          ? "https://api.iconify.design/ic:baseline-person.svg?color=%23ffffff"
                          : profile.friend_requests.includes(user)
                          ? "https://api.iconify.design/mdi:account-check.svg?color=%23ffffff"
                          : "https://api.iconify.design/ic:baseline-person-add-alt-1.svg?color=%23ffffff"
                      }
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
