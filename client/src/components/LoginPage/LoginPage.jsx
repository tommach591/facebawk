import "./LoginPage.css";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import {
  loginAccount,
  deleteAccount,
  getAllAccount,
} from "../../utils/Account";
import { deleteProfile, getAllProfile } from "../../utils/Profile";
import SignUpForm from "../SignUpForm";
import { useUserUpdate } from "../../utils/UserContext";

function LoginPage() {
  const changeUser = useUserUpdate();
  const [modalOn, setModalOn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = () => {
    loginAccount(loginEmail).then((res) => {
      if (res && res.password === loginPassword) {
        changeUser(res._id);
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
            <img src={Logo} alt="FaceBawk" />
            <h1>Cluck cluck cluck to all your friends on FaceBawk🐔.</h1>
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
            <div className="LoginScreenButtonContainer">
              <button
                className="LoginScreenButton Login"
                onClick={() => {
                  handleLogin();
                }}
              >
                Log in
              </button>
              <button
                className="LoginScreenButton Guest"
                onClick={() => {
                  handleGetAllAccount();
                }}
              >
                Use Guest Account
              </button>
            </div>
            <div className="ForgotPasswordButton">Forgot Password?</div>
            <div className="Line" style={{ width: "90%" }} />
            <div className="LoginScreenButtonContainer">
              <button
                className="LoginScreenButton Create"
                onClick={() => {
                  setModalOn(true);
                }}
              >
                Create New Account
              </button>
              <button
                className="LoginScreenButton Delete"
                onClick={() => {
                  handleDeleteAccount();
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className="LoginPageBottom">
          <h1 className="Fineprint">
            This is FaceBawk🐔 by ✨Tom Mach✨. Buk, buk, buk, ba-gawk.
          </h1>
        </div>
        <SignUpForm modalOn={modalOn} setModalOn={setModalOn} />
      </div>
    );
  };

  const getMobile = () => {
    return <div className="LoginPage"></div>;
  };

  return getWeb();
}

export default LoginPage;
