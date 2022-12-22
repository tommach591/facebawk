import "./HomeButton.css";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icon.png";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <div className="HomeButton">
      <img
        className="HomeIcon"
        src={Icon}
        alt="🐔"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}

export default HomeButton;
