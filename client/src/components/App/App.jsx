import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile } from "../../utils/Profile";
import { getCookie, printDatabase } from "../../utils/helper";
import { deleteAllPost } from "../../utils/Post";
import Home from "../Home";
import ProfilePage from "../ProfilePage/";

function App() {
  const [user, setUser] = useState(getCookie("id"));
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");

  // printDatabase();

  const changeUser = (newID) => {
    setUser(newID);
    document.cookie = `id=${newID}`;
  };

  useEffect(() => {
    getProfile(user).then((res) => {
      res ? setUserData(res) : setUserData({});
    });
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              userData={userData}
              changeUser={changeUser}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
              userData={userData}
              changeUser={changeUser}
              setSearch={setSearch}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
