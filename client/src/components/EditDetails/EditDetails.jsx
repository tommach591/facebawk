import { useEffect, useState } from "react";
import { updateIntro } from "../../utils/Profile";
import { useRefresh, useUserData } from "../../utils/UserContext";
import Modal from "../Modal";
import "./EditDetails.css";

function EditDetails({ modalOn, setModalOn, updateProfile }) {
  const userData = useUserData();
  const refreshUserData = useRefresh();
  const [bio, setBio] = useState("");
  const [work, setWork] = useState("");
  const [education, setEducation] = useState("");
  const [city, setCity] = useState("");
  const [hometown, setHometown] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    setBio(userData.bio);
    setWork(userData.work);
    setEducation(userData.education);
    setCity(userData.city);
    setHometown(userData.hometown);
    setRelationship(userData.relationship);
  }, [userData]);

  let handleEditDetails = () => {
    updateIntro(
      userData.user_id,
      bio,
      work,
      education,
      city,
      hometown,
      relationship
    ).then((res) => {
      refreshUserData();
    });
    let newProfile = JSON.parse(JSON.stringify(userData));
    newProfile.bio = bio;
    newProfile.work = work;
    newProfile.education = education;
    newProfile.city = city;
    newProfile.hometown = hometown;
    newProfile.relationship = relationship;
    updateProfile(newProfile);
    setModalOn(false);
  };

  return (
    <Modal modalOn={modalOn} setModalOn={setModalOn}>
      <div className="EditDetails">
        <h1 className="Title">Edit Details</h1>
        <form
          className="EditDetailsForm"
          onSubmit={(event) => {
            event.preventDefault();
            handleEditDetails();
          }}
        >
          <div className="Section">
            <label>Bio</label>
            <textarea
              defaultValue={bio}
              placeholder="Tell us about yourself!"
              onChange={(event) => {
                setBio(event.currentTarget.value);
              }}
            />
          </div>
          <div className="Section">
            <label>Work</label>
            <input
              defaultValue={work}
              placeholder="Where do you work?"
              onChange={(event) => {
                setWork(event.currentTarget.value);
              }}
            />
          </div>
          <div className="Section">
            <label>Education</label>
            <input
              defaultValue={education}
              placeholder="Where did you study?"
              onChange={(event) => {
                setEducation(event.currentTarget.value);
              }}
            />
          </div>
          <div className="Section">
            <label>City</label>
            <input
              defaultValue={city}
              placeholder="Where are you staying?"
              onChange={(event) => {
                setCity(event.currentTarget.value);
              }}
            />
          </div>
          <div className="Section">
            <label>Hometown</label>
            <input
              defaultValue={hometown}
              placeholder="Where are you from?"
              onChange={(event) => {
                setHometown(event.currentTarget.value);
              }}
            />
          </div>
          <div className="Section">
            <label>Relationship</label>
            <input
              defaultValue={relationship}
              placeholder="How is the love life?"
              onChange={(event) => {
                setRelationship(event.currentTarget.value);
              }}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </Modal>
  );
}

export default EditDetails;
