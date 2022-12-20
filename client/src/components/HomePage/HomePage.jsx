import "./HomePage.css";
import { useState } from "react";
import Header from "../Header";
import { useEffect } from "react";
import { getProfile } from "../../utils/Profile";

function HomePage({ user, changeUser }) {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getProfile(user).then((res) => {
      setUserData(res);
    });
  }, [user]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return userData ? (
    <div className="HomePage">
      <Header
        userData={userData}
        changeUser={changeUser}
        setSearch={setSearch}
      />
      <div className="Content">
        <div className="Cluck">
          <div className="MainCluck">
            <img
              src={
                userData.pfp
                  ? userData.pfp
                  : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
              }
              alt="PFP"
            />
            <input type="text" placeholder="What's clucking?" />
          </div>
          <div className="Line" style={{ width: "95%" }} />
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default HomePage;
