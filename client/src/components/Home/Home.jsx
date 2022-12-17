import "./Home.css";
import HomeButton from "../HomeButton";
import LoginPage from "../LoginPage";
import { useState } from "react";

function Home() {
  const [user, setUser] = useState("");

  return (
    <div className="Home">
      {user === "" ? <LoginPage setUser={setUser} /> : <div />}
    </div>
  );
}

export default Home;
