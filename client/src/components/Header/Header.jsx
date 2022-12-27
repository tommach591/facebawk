import "./Header.css";
import HomeButton from "../HomeButton";
import SearchBar from "../SearchBar/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData, useUserUpdate } from "../../utils/UserContext";
import { useRef } from "react";
import { useEffect } from "react";

function Header({ search, setSearch }) {
  const userData = useUserData();
  const changeUser = useUserUpdate();

  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleDropdownClick(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setDropdown(false);
      }
    }
    window.addEventListener("mousedown", handleDropdownClick);
    return () => {
      window.removeEventListener("mousedown", handleDropdownClick);
    };
  }, [dropdown]);

  return (
    <div className="Header">
      <HomeButton />
      <SearchBar search={search} setSearch={setSearch} />
      <div className="Update" ref={dropdownRef}>
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
          {userData.friend_requests.length > 0 ? (
            <div className="Notifications AtProfile">
              <h2>{userData.friend_requests.length}</h2>
            </div>
          ) : (
            <div />
          )}
        </div>
        {dropdown ? (
          <div className="Dropdown">
            <h1
              className="DropdownOption"
              onClick={() => {
                navigate(`/profile/?user=${userData.user_id}`);
                setDropdown(!dropdown);
              }}
            >
              Profile
            </h1>
            <h1
              className="DropdownOption"
              onClick={() => {
                navigate("/requests");
                setDropdown(!dropdown);
              }}
            >
              Friend Requests
              {userData.friend_requests.length > 0 ? (
                <div className="Notifications AtDropdown">
                  <h2>{userData.friend_requests.length}</h2>
                </div>
              ) : (
                <div />
              )}
            </h1>
            <h1
              className="DropdownOption"
              onClick={() => {
                changeUser("");
                navigate("/");
                setDropdown(!dropdown);
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
