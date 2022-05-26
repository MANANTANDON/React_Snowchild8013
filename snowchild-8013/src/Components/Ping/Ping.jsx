import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import PingCard from "./Ping.module.scss";
import { useNavigate, Link } from "react-router-dom";
import backArrow from "../universalImages/backArrow.png";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

import * as ReactBootStrap from "react-bootstrap";
//timestamp

export const Ping = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [spin, setSpin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postUserData, setPostUserData] = useState({});
  const [imageUpload, setImageUpload] = useState();
  const [profilePicture, setProfilePicture] = useState("");
  const [post, setPost] = useState("");
  const uniq = "id" + new Date().getTime();

  const timestamp = Date.now();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    //get profile picture
    const fetchProfilePicture = async () => {
      const profileref = ref(storage, currentUser.uid + "/profile.png");
      const photoUrl = await getDownloadURL(profileref);
      setProfilePicture(photoUrl);

      const snapshot = await getDoc(doc(db, "users", currentUser.uid));
      const userData = snapshot.data();
      setPostUserData(userData);
    };

    fetchProfilePicture();
  }, []);

  const imageHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageUpload(event.target.files[0]);
    }
  };

  const uploadHandler = async (event) => {
    event.preventDefault();

    if (!imageUpload) {
      alert("No file selected !");
      return;
    }
    //uploading image...
    const fileref = ref(storage, "post/" + uniq + "/" + imageUpload.name);

    setLoading(true);
    setSpin(true);
    const uploadRef = await uploadBytes(fileref, imageUpload);
    const postUrl = await getDownloadURL(fileref);

    setLoading(false);
    setSpin(false);
    setPost(postUrl);
  };

  const finishHandler = () => {
    console.log("finish");
    setLoading(true);
    setDoc(doc(db, "posts", uniq), {
      userName: postUserData.displayName,
      profileImage: profilePicture,
      postImage: post,
      timeOfPost: formatDate(timestamp),
    });
    setLoading(false);
    navigate("/homepage");
  };

  return (
    <React.Fragment>
      <div className={PingCard.backBar}>
        <button className={PingCard.backButton}>
          <Link to="/homepage">
            <img src={backArrow} alt="backArrow" />
          </Link>
        </button>
      </div>
      {/*Image upload*/}
      <div
        style={{
          boxSizing: "border-box",
          width: "fit-content",
          margin: "auto",
          fontFamily: "Open Sans",
          fontSize: "30px",
          marginTop: "20px",
        }}
      >
        here for new <span className={PingCard.textDeco}>upload</span>{" "}
      </div>
      <div>
        <div className={PingCard.selectFile}>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={imageHandler}
            style={{ display: "none" }}
          />
          <label htmlFor="file" className={PingCard.btn}>
            <span>select</span>
          </label>
        </div>
        {imageUpload && (
          <div className={PingCard.imageCircle}>
            <img src={URL.createObjectURL(imageUpload)} alt="thumb" />
          </div>
        )}
      </div>

      {loading ? (
        spin ? (
          <div>
            <ReactBootStrap.Spinner animation="border" />
            uploading...
          </div>
        ) : (
          <div className={PingCard.outerButtonBorder}>
            <button onClick={uploadHandler} className={PingCard.submitButton}>
              {" "}
              upload
            </button>
          </div>
        )
      ) : (
        <div className={PingCard.outerButtonBorder}>
          <button onClick={finishHandler} className={PingCard.submitButton}>
            Done
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
