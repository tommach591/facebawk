import "./HomeButton.css";
import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <div className="HomeButton">
      <Link to="/">
        <img
          className="HomeIcon"
          src={"https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg"}
          alt="Home"
        />
      </Link>
    </div>
  );
}

export default HomeButton;
