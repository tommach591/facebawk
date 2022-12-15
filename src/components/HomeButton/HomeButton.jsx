import "./HomeButton.css";
import { Link } from "react-router-dom";
import BookToFace from "../../utils/booktoface.svg";

function HomeButton() {
  return (
    <div className="HomeButton">
      <Link to="/">
        <img className="HomeIcon" src={BookToFace} alt="Home" />
      </Link>
    </div>
  );
}

export default HomeButton;
