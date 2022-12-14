import "./HomeButton.css";
import { Link } from "react-router-dom";
import Facebook from "../../utils/facebook.svg";

function HomeButton() {
  return (
    <div className="HomeButton">
      <Link to="/">
        <img className="HomeIcon" src={Facebook} alt="Home" />
      </Link>
    </div>
  );
}

export default HomeButton;
