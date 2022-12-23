import "./Home.css";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";
import { useUserData } from "../../utils/UserContext";

function Home() {
  const userData = useUserData();

  return (
    <div className="Home">
      {Object.keys(userData).length === 0 ? <LoginPage /> : <HomePage />}
    </div>
  );
}

export default Home;
