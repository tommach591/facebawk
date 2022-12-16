import "./LoginPage.css";
import BookToFace from "../../assets/booktoface.svg";
import { useState } from "react";
import uuid from "react-uuid";
import Modal from "../Modal/";
import { useEffect } from "react";

function LoginPage({ isMobile }) {
  const [modalOn, setModalOn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("Jan");
  const [day, setDay] = useState("1");
  const [year, setYear] = useState("1900");
  const [gender, setGender] = useState("Female");

  const [response, setResponse] = useState(null);

  let createAccount = () => {
    let body = {
      email: email,
      password: password,
    };

    fetch(`http://localhost:3001/api/account/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) res.json();
        else setResponse("404");
      })
      .then((retrieved) => {
        setResponse(retrieved);
      })
      .catch((err) => console.error(err));
  };

  let loginAccount = () => {
    fetch(`http://localhost:3001/api/account/login/${loginEmail}`)
      .then((res) => {
        if (res.ok) res.json();
        else setResponse("404");
      })
      .then((retrieved) => {
        setResponse(retrieved);
      })
      .catch((err) => console.error(err));
  };

  let deleteAccount = () => {
    let body = {
      email: loginEmail,
      password: loginPassword,
    };

    fetch(`http://localhost:3001/api/account/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) res.json();
        else setResponse("404");
      })
      .then((retrieved) => {
        setResponse(retrieved);
      })
      .catch((err) => console.error(err));
  };

  let getAllAccount = () => {
    fetch("http://localhost:3001/api/account/allAccounts")
      .then((res) => {
        if (res.ok) res.json();
        else setResponse("404");
      })
      .then((retrieved) => {
        setResponse(retrieved);
        console.log(retrieved);
      })
      .catch((err) => console.error(err));
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
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.currentTarget.value);
              }}
            />
            <div className="LoginButtonContainer">
              <button
                className="LoginButton"
                onClick={() => {
                  loginAccount();
                }}
              >
                Log in
              </button>
              <button
                className="LoginButton"
                onClick={() => {
                  deleteAccount();
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
                  getAllAccount();
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
        <Modal modalOn={modalOn} setModalOn={setModalOn}>
          <div className="SignUpForm">
            <h1 className="SignUpFormTitle">Sign Up</h1>
            <h2 className="SignUpFormDescription">It's quick and easy.</h2>
            <div className="Line" />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                createAccount();
                setModalOn(false);
              }}
            >
              <div className="SignUpFormNames">
                <input
                  type="text"
                  placeholder="First name"
                  onChange={(event) => {
                    setFirstName(event.currentTarget.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  onChange={(event) => {
                    setLastName(event.currentTarget.value);
                  }}
                />
              </div>
              <div className="SignUpCredentials">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="New password"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </div>
              <h2>Birthday</h2>
              <div className="SignUpBirthday">
                <select
                  name="Month"
                  onChange={(event) => {
                    setMonth(event.currentTarget.value);
                  }}
                >
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
                <select
                  name="Day"
                  onChange={(event) => {
                    setDay(event.currentTarget.value);
                  }}
                >
                  {Array.from(Array(31).keys()).map((i, j) => {
                    return (
                      <option key={j} value={j + 1}>
                        {j + 1}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="Year"
                  onChange={(event) => {
                    setYear(event.currentTarget.value);
                  }}
                >
                  {Array.from(Array(123).keys()).map((i, j) => {
                    return (
                      <option key={j} value={j + 1900}>
                        {j + 1900}
                      </option>
                    );
                  })}
                </select>
              </div>
              <h2>Gender</h2>
              <div className="SignUpGender">
                <label>
                  Female
                  <input
                    type="radio"
                    name="Gender"
                    defaultChecked
                    onChange={(event) => {
                      if (event.currentTarget.value) setGender("Female");
                    }}
                  />
                </label>
                <label>
                  Male
                  <input
                    type="radio"
                    name="Gender"
                    onChange={(event) => {
                      if (event.currentTarget.value) setGender("Male");
                    }}
                  />
                </label>
                <label>
                  Neither
                  <input
                    type="radio"
                    name="Gender"
                    onChange={(event) => {
                      if (event.currentTarget.value) setGender("Neither");
                    }}
                  />
                </label>
              </div>
              <div className="SignUpTerms">
                <h2>
                  People who use our service may not have uploaded your contact
                  information to BookToFace. This is fake.
                </h2>
                <h2>
                  By clicking Sign Up, you agree to our nonexistent Terms,
                  Privacy Policy and Cookies Policy and acknowledge this is
                  fake. You won't receive SMS Notifications from us.
                </h2>
              </div>
              <div className="SignUpFormButtonContainer">
                <button className="SignUpFormButton" type="submit">
                  Sign Up
                </button>
              </div>
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
