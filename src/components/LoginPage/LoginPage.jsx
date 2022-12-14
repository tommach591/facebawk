import "./LoginPage.css";
import Facebook from "../../utils/facebook.svg";
import { useState, useRef } from "react";
import Modal from "../Modal/Modal";

function LoginPage({ isMobile }) {
  const [modalOn, setModalOn] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const signUpRef = useRef();

  const getWeb = () => {
    return (
      <div className="LoginPage">
        <div className="SignIn">
          <div className="Description">
            <img src={Facebook} alt="Facebook" />
            <h1>Connect with friends and the world around you on Facebook.</h1>
          </div>
          <div className="SignInForm">
            <input type="text" placeholder="Email" ref={emailRef} />
            <input type="text" placeholder="Password" ref={passwordRef} />
            <button
              className="LoginButton"
              onClick={() => {
                console.log(emailRef.current.value, passwordRef.current.value);
              }}
            >
              Log in
            </button>
            <div className="ForgotPasswordButton">Forgot Password?</div>
            <div className="Line" style={{ width: "90%" }} />
            <button
              className="SignUpButton"
              onClick={() => {
                setModalOn(true);
              }}
            >
              Create New Account
            </button>
          </div>
        </div>
        <div className="LoginPageBottom">
          <h1 className="Fineprint">This is a Facebook clone by Tom Mach.</h1>
        </div>
        <Modal modalOn={modalOn} setModalOn={setModalOn}>
          <div className="SignUpForm">
            <h1 className="SignUpFormTitle">Sign Up</h1>
            <h2 className="SignUpFormDescription">It's quick and easy.</h2>
            <div className="Line" />
            <form
              ref={signUpRef}
              onSubmit={(event) => {
                event.preventDefault();
                alert(signUpRef.current.children[3]);
              }}
            >
              <div className="SignUpFormNames">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="New password" />
              <div className="Birth">
                <select name="Month">
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>
                <select name="Day">
                  {Array.from(Array(31).keys()).map((i, j) => {
                    return (
                      <option key={j} value={j + 1}>
                        {j + 1}
                      </option>
                    );
                  })}
                </select>
                <select name="Year">
                  {Array.from(Array(123).keys()).map((i, j) => {
                    return (
                      <option key={j} value={j + 1900}>
                        {j + 1900}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="Gender">
                <label>
                  Female
                  <input type="radio" name="Gender" />
                </label>
                <label>
                  Male
                  <input type="radio" name="Gender" />
                </label>
                <label>
                  Neither
                  <input type="radio" name="Gender" />
                </label>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  };

  const getMobile = () => {
    return <div className="LoginPage"></div>;
  };

  return isMobile ? getMobile() : getWeb();
}

export default LoginPage;
