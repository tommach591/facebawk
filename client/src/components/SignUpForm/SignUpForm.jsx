import "./SignUpForm.css";
import { useState } from "react";
import Modal from "../Modal";
import { createAccount } from "../../utils/Account";
import { createProfile } from "../../utils/Profile";

function SignUpForm({ modalOn, setModalOn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("0");
  const [day, setDay] = useState("1");
  const [year, setYear] = useState("1900");
  const [gender, setGender] = useState("Female");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setMonth("0");
    setDay("1");
    setYear("1900");
    setGender("Female");
    setModalOn(false);
  };

  const handleCreateAccount = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("Fill out the form.");
      return;
    }

    createAccount(email, password).then((res) => {
      if (res.success === false) alert("Email in use.");
      else {
        let date = new Date(year, month, day);
        createProfile(res._id, email, firstName, lastName, date, gender).then(
          (res) => {
            alert("Account created successfully.");
            resetForm();
          }
        );
      }
    });
  };

  return (
    <Modal modalOn={modalOn} setModalOn={setModalOn}>
      <div className="SignUpForm">
        <h1 className="SignUpFormTitle">Sign Up</h1>
        <h2 className="SignUpFormDescription">It's quick and easy.</h2>
        <div className="Line" />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCreateAccount();
          }}
        >
          <div className="SignUpFormNames">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.currentTarget.value);
              }}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.currentTarget.value);
              }}
            />
          </div>
          <div className="SignUpCredentials">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
            />
            <input
              type="text"
              placeholder="New password"
              value={new Array(password.length + 1).join("*")}
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
              value={month}
            >
              <option value="0">Jan</option>
              <option value="1">Feb</option>
              <option value="2">Mar</option>
              <option value="3">Apr</option>
              <option value="4">May</option>
              <option value="5">Jun</option>
              <option value="6">Jul</option>
              <option value="7">Aug</option>
              <option value="8">Sep</option>
              <option value="9">Oct</option>
              <option value="10">Nov</option>
              <option value="11">Dec</option>
            </select>
            <select
              name="Day"
              onChange={(event) => {
                setDay(event.currentTarget.value);
              }}
              value={day}
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
              value={year}
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
                checked={gender === "Female"}
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
                checked={gender === "Male"}
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
                checked={gender === "Neither"}
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
              By clicking Sign Up, you agree to our nonexistent Terms, Privacy
              Policy and Cookies Policy and acknowledge this is fake. You won't
              receive SMS Notifications from us.
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
  );
}

export default SignUpForm;
