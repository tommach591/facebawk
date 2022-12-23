import "./FriendRequestPage.css";
import { useUserData } from "../../utils/UserContext";
import FriendRequest from "../FriendRequest/";
import { useEffect, useState } from "react";

function FriendRequestPage() {
  const userData = useUserData();
  const [friendReq, setFriendReq] = useState([]);

  useEffect(() => {
    Object.keys(userData).length !== 0
      ? setFriendReq([...userData.friend_requests])
      : setFriendReq([]);
  }, [userData]);

  return (
    <div className="FriendRequestPage">
      <div className="ListOfFriendRequests">
        {friendReq.length > 0 ? (
          friendReq.map((id) => {
            return <FriendRequest key={id} id={id} userData={userData} />;
          })
        ) : (
          <h1 className="Nothing">No friend requests :(</h1>
        )}
      </div>
    </div>
  );
}

export default FriendRequestPage;
