import "./LoginPage.css";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { loginAccount, deleteAccount } from "../../utils/Account";
import { deleteProfile } from "../../utils/Profile";
import SignUpForm from "../SignUpForm";
import { useUserUpdate } from "../../utils/UserContext";
import { deletePostsByUser } from "../../utils/Post";

function LoginPage() {
  const changeUser = useUserUpdate();
  const [modalOn, setModalOn] = useState(false);

  const [loginLogin, setLoginLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = () => {
    loginAccount(loginLogin).then((res) => {
      if (res && res.password === loginPassword) {
        changeUser(res._id);
      } else {
        alert("Invalid login and password.");
      }
    });
  };

  const handleDeleteAccount = () => {
    if (loginLogin !== "facebawk")
      deleteAccount(loginLogin, loginPassword).then((res) => {
        if (res._id) {
          deleteProfile(res._id).then((res) => {
            if (res)
              deletePostsByUser(res.user_id).then(() => {
                alert("Account has been deleted.");
                setLoginLogin("");
                setLoginPassword("");
              });
          });
        } else alert("Account does not exist or invalid password.");
      });
    else alert("Cannot delete guest account.");
  };

  const handleGuestAccount = () => {
    setLoginLogin("facebawk");
    setLoginPassword("password");
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
              placeholder="Login"
              onChange={(event) => {
                setLoginLogin(event.currentTarget.value);
              }}
              value={loginLogin}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.currentTarget.value);
              }}
              value={loginPassword}
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
                  handleGuestAccount();
                }}
              >
                Use Guest Account
              </button>
            </div>
            {/* <div className="ForgotPasswordButton">Forgot Password?</div> */}
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
            There might be some lag when logging in due to the backend being on
            sleep mode. Refresh the page if that happens and try again.
          </h1>
        </div>
        <SignUpForm modalOn={modalOn} setModalOn={setModalOn} />
      </div>
    );
  };

  return getWeb();
}

export default LoginPage;
