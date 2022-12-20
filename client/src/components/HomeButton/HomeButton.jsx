import "./HomeButton.css";
import { Link } from "react-router-dom";
import Icon from "../../assets/icon.png";

function HomeButton() {
  return (
    <div className="HomeButton">
      <Link to="/">
        <img className="HomeIcon" src={Icon} alt="🐔" />
      </Link>
    </div>
  );
}

export default HomeButton;
