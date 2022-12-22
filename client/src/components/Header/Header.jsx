import "./Header.css";
import HomeButton from "../HomeButton";
import SearchBar from "../SearchBar/";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Header({ userData, changeUser, setSearch }) {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="Header">
      <HomeButton />
      <SearchBar setSearch={setSearch} />
      <div className="Update">
        <div
          className="Profile"
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <img
            src={
              userData.pfp
                ? userData.pfp
                : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
            }
            alt="PFP"
          />
        </div>
        {dropdown ? (
          <div className="Dropdown">
            <h1
              className="DropdownOption"
              onClick={() => {
                navigate(`/profile/?user=${userData.user_id}`);
              }}
            >
              Account
            </h1>
            <h1
              className="DropdownOption"
              onClick={() => {
                changeUser("");
                navigate("/");
              }}
            >
              Logout
            </h1>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Header;
