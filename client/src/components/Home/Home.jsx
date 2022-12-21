import "./Home.css";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";
import { useState } from "react";
import { getCookie } from "../../utils/helper";
import { getAllAccount } from "../../utils/Account";
import { getAllProfile } from "../../utils/Profile";
import { deleteAllPost, getAllPost } from "../../utils/Post";

function Home() {
  const [user, setUser] = useState(getCookie("id"));

  const changeUser = (newID) => {
    setUser(newID);
    document.cookie = `id=${newID}`;
  };

  return (
    <div className="Home">
      {user === "" ? (
        <LoginPage changeUser={changeUser} />
      ) : (
        <HomePage user={user} changeUser={changeUser} />
      )}
    </div>
  );
}

export default Home;
