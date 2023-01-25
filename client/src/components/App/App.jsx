import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "../Home";
import ProfilePage from "../ProfilePage/";
import Header from "../Header";
import SearchPage from "../SearchPage/";
import FriendRequestPage from "../FriendRequestPage/";
import { useUserData } from "../../utils/UserContext";
import { usePing } from "../../utils/usePing";

function App() {
  const userData = useUserData();
  const ping = usePing();
  const [search, setSearch] = useState("");

  return ping ? (
    <div className="App">
      {Object.keys(userData).length !== 0 ? (
        <Header search={search} setSearch={setSearch} />
      ) : (
        <div />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/requests" element={<FriendRequestPage />} />
      </Routes>
    </div>
  ) : (
    <div className="Loading">
      <h1>Pinging server...</h1>
    </div>
  );
}

export default App;
