import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//css
import ProfileCard from "./Profile.module.css";

//images
import backArrow from "../universalImages/backArrow.png";

//firestore
import { auth, db, storage } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

//bootstrap
import * as ReactBootStrap from "react-bootstrap";
import { getDownloadURL, ref } from "firebase/storage";

export const Profile = () => {
  const [users, setUsers] = useState({
    displayName: "",
    city: "",
    contact: "",
    dob: "",
    username: "",
  });
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const userData = snapshot.data();
        setUsers({
          displayName: userData.displayName,
          city: userData.city,
          contact: userData.phone,
          dob: userData.dateOfBirth,
          username: userData.userName,
        });

        // const fileref = ref(storage, currentUser.uid + "/profile.png");
        const fileRef = ref(storage, user.uid + "/profile.png");
        const photoUrl = await getDownloadURL(fileRef);
        setImageUrl(photoUrl);

        setLoading(false);
      }
    });
  }, []);

  console.log(imageUrl);

  return (
    <React.Fragment>
      <div className={ProfileCard.backBar}>
        <button className={ProfileCard.backButton}>
          <Link to="/homepage">
            <img src={backArrow} alt="backArrow" />
          </Link>
        </button>
      </div>
      <div className={ProfileCard.userDetails}>
        {loading ? (
          <ReactBootStrap.Spinner animation="border" />
        ) : (
          <>
            <div>
              <span className={ProfileCard.coloredName}>
                {users.displayName}
              </span>
              <div className={ProfileCard.progressBarOuter}>
                <span className={ProfileCard.progressBarText}>popularity</span>
                <div className={ProfileCard.progressBarInner}></div>
              </div>
              <div src={imageUrl} className={ProfileCard.imageCircle}>
                <img
                  src={imageUrl}
                  alt="userImage"
                  onClick={() => console.log("clicked")}
                />
              </div>
              <div
                style={{
                  boxSizing: "border-box",
                  margin: "auto",
                  width: "fit-content",
                  marginTop: "20px",
                }}
              >
                @{users.username}
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};
