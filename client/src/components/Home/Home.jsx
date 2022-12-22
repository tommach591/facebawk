import "./Home.css";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";

function Home({ user, userData, changeUser, setSearch }) {
  return (
    <div className="Home">
      {user === "" ? (
        <LoginPage changeUser={changeUser} />
      ) : (
        <HomePage userData={userData} changeUser={changeUser} />
      )}
    </div>
  );
}

export default Home;
