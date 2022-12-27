import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "../Home";
import ProfilePage from "../ProfilePage/";
import Header from "../Header";
import SearchPage from "../SearchPage/";
import FriendRequestPage from "../FriendRequestPage/";
import { useUserData } from "../../utils/UserContext";

function App() {
  const userData = useUserData();
  const [search, setSearch] = useState("");

  return (
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
  );
}

export default App;
