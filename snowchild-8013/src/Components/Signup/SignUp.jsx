import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

//css module import
import signupCard from "./SignUp.module.scss";

//images
import backArrow from "../universalImages/backArrow.png";
// import defaultImage from "./default.jpg";

export const SignUp = () => {
  //State....
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [contact, setContact] = useState("");
  const [userName, setUserName] = useState("");
  const [userCity, setUserCity] = useState("");
  const [dob, setDob] = useState("");
  const [emailRef, setEmailRef] = useState("");
  const [passwordRef, setPasswordRef] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [error, setError] = useState("");
  const [ifError, setIfError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("continue");
  const [after, setAfter] = useState(false);
  const [afterSecond, setAfterSecond] = useState(false);
  const [afterThird, setAfterThird] = useState(false);
  const [afterFourth, setAfterFourth] = useState(false);

  const [change, setChange] = useState(true);

  //First
  const [changeName, setChangeName] = useState(false);
  const [changeNameMoved, setChangeNameMoved] = useState(false);

  const [userNameFields, setUserNameFields] = useState(false);
  const [userNameFieldsMoved, setUserNameFieldsMoved] = useState(false);

  //second
  const [changeContact, setChangeContact] = useState(false);
  const [changeContactMoved, setChangeContactMoved] = useState(false);

  const [contactFields, setContactFields] = useState(false);
  const [contactFieldsMoved, setContactFieldsMoved] = useState(false);

  //third
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeEmailMoved, setChangeEmailMoved] = useState(false);

  const [emailFields, setEmailFeilds] = useState(false);
  const [emailFieldsMoved, setEmailFieldsMoved] = useState(false);

  //forth
  const [changeImage, setChangeImage] = useState(false);
  const [imageFields, setImageFields] = useState(false);

  //submit
  const [lastButton, setLastButton] = useState(false);

  //profile picture
  const [imageUpload, setImageUpload] = useState();
  const [initialImage, setInitialImage] = useState(false);

  const imageHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setInitialImage(true);
      setImageUpload(event.target.files[0]);
    }
  };

  //sinup methods
  const { signup } = useAuth();
  const navigate = useNavigate();

  const signupHandler = async (event) => {
    event.preventDefault();

    if (passwordRef !== confirmationPassword) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef,
        passwordRef,
        firstName,
        secondName,
        contact,
        userCity,
        dob,
        userName,
        imageUpload
      );
      navigate("/homepage");
    } catch {
      setError("Failed to create an Account !");
      setIfError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAfter(true);
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <div className={signupCard.backBar}>
        <button className={signupCard.backButton}>
          <Link to="/">
            <img src={backArrow} alt="backArrow" />
          </Link>
        </button>
      </div>

      {/*Driver Start */}
      <div>
        {/*Welcome quote*/}
        <div
          className={
            change ? `${signupCard.outerCont}` : `${signupCard.outerContMoved}`
          }
        >
          <div className={signupCard.initialText}>
            Hey <span className={signupCard.textDeco}>SnowChild</span>, Welcome
          </div>
          <div className={signupCard.contButton}>
            <input
              type="button"
              onClick={() => {
                setChange(false);
                setChangeName(true);
                setChangeNameMoved(true);
                setUserNameFields(true);
                setUserNameFieldsMoved(true);
                setAfter(false);
                setAfterSecond(true);
              }}
              style={{ marginTop: "100px" }}
              value={message}
            />
          </div>
        </div>
        {/* welcome section ended*/}

        {/*Form started*/}
        <div>
          <form onSubmit={signupHandler}>
            {/* second section started */}
            <div
              className={
                changeName
                  ? changeNameMoved
                    ? `${signupCard.userNamecss}`
                    : `${signupCard.userNamecssMoved}`
                  : `${signupCard.initialName}`
              }
            >
              <div className={signupCard.nameText}>
                What's your <span className={signupCard.textDeco}>name</span> :)
                ?
              </div>
              <div className={signupCard.nameFields}>
                <input
                  type="text"
                  className={signupCard.firstNamecss}
                  placeholder="Your first name"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                  type="text"
                  className={signupCard.secondNamecss}
                  placeholder="and your last name"
                  onChange={(event) => setSecondName(event.target.value)}
                />
              </div>
              <div
                className={signupCard.contButton}
                style={{ marginTop: "30px" }}
              >
                <input
                  type="button"
                  onClick={() => {
                    setChangeNameMoved(false);
                    setUserNameFieldsMoved(false);
                    setChangeContact(true);
                    setChangeContactMoved(true);
                    setContactFields(true);
                    setContactFieldsMoved(true);
                    setAfterSecond(false);
                    setAfterThird(true);
                  }}
                  value={message}
                />
              </div>
            </div>
            {/* second section ended*/}

            {/* Third Section*/}
            <div
              className={
                changeContact
                  ? changeContactMoved
                    ? `${signupCard.contactTextCss}`
                    : `${signupCard.contactTextCssMoved}`
                  : `${signupCard.initialContact}`
              }
            >
              <div className={signupCard.contactText}>
                I want to know your{" "}
                <span className={signupCard.textDeco}>contact...</span>
              </div>
              <div className={signupCard.contactcss}>
                <input
                  type="text"
                  placeholder="userName"
                  onChange={(event) => setUserName(event.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="your City"
                  style={{ outline: "none" }}
                  onChange={(event) => setUserCity(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="your Contact +91"
                  style={{ outline: "none" }}
                  onChange={(event) => setContact(event.target.value)}
                />
                <input
                  type="date"
                  style={{ outline: "none" }}
                  onChange={(event) => setDob(event.target.value)}
                />
              </div>
              <div
                className={signupCard.contButton}
                style={{ marginTop: "30px" }}
              >
                <input
                  type="button"
                  onClick={() => {
                    setChangeContactMoved(false);
                    setContactFieldsMoved(false);
                    setChangeEmail(true);
                    setChangeEmailMoved(true);
                    setEmailFeilds(true);
                    setEmailFieldsMoved(true);
                    setAfterThird(false);
                    setAfterFourth(true);
                  }}
                  value={message}
                />
              </div>
            </div>
            {/* Third section ended*/}

            {/* Fourth section*/}
            <div
              className={
                changeEmail
                  ? changeEmailMoved
                    ? `${signupCard.authCss}`
                    : `${signupCard.authCssMoved}`
                  : `${signupCard.initialAuth}`
              }
            >
              <div className={signupCard.authText}>
                now Lets set your{" "}
                <span className={signupCard.textDeco}>email</span> and{" "}
                <span className={signupCard.textDeco}>password</span>..
              </div>
              <div className={signupCard.userAuthcss}>
                <input
                  type="email"
                  placeholder="email"
                  onChange={(event) => setEmailRef(event.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={(event) => setPasswordRef(event.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="confirm please"
                  onChange={(event) =>
                    setConfirmationPassword(event.target.value)
                  }
                  required
                />
              </div>
              <div
                className={signupCard.contButton}
                style={{ marginTop: "30px" }}
              >
                <input
                  type="button"
                  onClick={() => {
                    setChangeEmailMoved(false);
                    setEmailFieldsMoved(false);
                    setChangeImage(true);
                    setImageFields(true);
                    setAfterFourth(false);
                  }}
                  style={{ marginTop: "0" }}
                  value={message}
                />
              </div>
            </div>
            {/* Forth section ended */}
            {ifError && <div className={signupCard.error}>{error}</div>}
            {/* Final Section*/}
            <div
              className={
                changeImage
                  ? `${signupCard.imageTextCss}`
                  : `${signupCard.initialImage}`
              }
            >
              <div className={signupCard.imageText}>
                lets setup your{" "}
                <span className={signupCard.textDeco}>Profile Picture</span>
              </div>
              <div className={signupCard.imagecss}>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={imageHandler}
                  style={{ display: "none" }}
                />
                <label htmlFor="file" className={signupCard.btn}>
                  <span>select</span>
                </label>
                {imageUpload && (
                  <div className={signupCard.imageCircle}>
                    <img src={URL.createObjectURL(imageUpload)} alt="thumb" />
                  </div>
                )}
              </div>
              <button type="submit" className={signupCard.submitButton}>
                {" "}
                Get in
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
