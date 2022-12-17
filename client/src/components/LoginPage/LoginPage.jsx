import "./LoginPage.css";
import BookToFace from "../../assets/booktoface.svg";
import { useState } from "react";
import {
  loginAccount,
  deleteAccount,
  getAllAccount,
} from "../../utils/Account";
import { deleteProfile, getAllProfile } from "../../utils/Profile";
import SignUpForm from "../SignUpForm";

function LoginPage({ setUser, isMobile }) {
  const [modalOn, setModalOn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = () => {
    loginAccount(loginEmail).then((res) => {
      if (res && res.password === loginPassword) {
        setUser(res._id);
        alert("Success!");
      } else {
        alert("Invalid email and password.");
      }
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount(loginEmail, loginPassword).then((res) => {
      console.log(res);
      if (res.success === true) {
        deleteProfile(loginEmail).then((res) => {
          alert("Account has been deleted.");
        });
      } else alert("Account does not exist or invalid password.");
    });
  };

  const handleGetAllAccount = () => {
    getAllAccount().then((res) => {
      console.log(res);
      getAllProfile().then((res) => {
        console.log(res);
        alert("Printed all accounts and profiles to console.");
      });
    });
  };

  const getWeb = () => {
    return (
      <div className="LoginPage">
        <div className="SignIn">
          <div className="Description">
            <img src={BookToFace} alt="booktoface" />
            <h1>
              Connect with friends and the world around you on BookToFace.
            </h1>
          </div>
          <div className="SignInForm">
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => {
                setLoginEmail(event.currentTarget.value);
              }}
              value={loginEmail}
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.currentTarget.value);
              }}
              value={new Array(loginPassword.length + 1).join("*")}
            />
            <div className="LoginButtonContainer">
              <button
                className="LoginButton"
                onClick={() => {
                  handleLogin();
                }}
              >
                Log in
              </button>
              <button
                className="LoginButton"
                onClick={() => {
                  handleDeleteAccount();
                }}
              >
                Delete Account
              </button>
            </div>
            <div className="ForgotPasswordButton">Forgot Password?</div>
            <div className="Line" style={{ width: "90%" }} />
            <div className="LoginButtons">
              <button
                className="SignUpButton"
                onClick={() => {
                  setModalOn(true);
                }}
              >
                Create New Account
              </button>
              <button
                className="SignUpButton GuestLoginButton"
                onClick={() => {
                  handleGetAllAccount();
                }}
              >
                Use Guest Account
              </button>
            </div>
          </div>
        </div>
        <div className="LoginPageBottom">
          <h1 className="Fineprint">This is a BookToFace by Tom Mach.</h1>
        </div>
        <SignUpForm modalOn={modalOn} setModalOn={setModalOn} />
      </div>
    );
  };

  const getMobile = () => {
    return <div className="LoginPage"></div>;
  };

  return isMobile ? getMobile() : getWeb();
}

export default LoginPage;
