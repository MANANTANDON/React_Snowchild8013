import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";

//Image imports
import DP1 from "./DawnFm.png";
import ArrowUp from "./arrowUp.png";
import ChatTeardrop from "./chatTeardrop.png";
import PaperClip from "./paperClip.png";

import "./HomePage.scss";
import Post from "./post.jpeg";
// import Post1 from "./UI1.png";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MyButtonMenu } from "./MyButtonMenu";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  orderBy,
} from "firebase/firestore";

gsap.registerPlugin(ScrollTrigger);

export const HomePage = (props) => {
  // const [error, setError] = useState("");
  const { currentUser } = useAuth();
  // const [toggle, setToggle] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [posts, setPosts] = useState([{}]);

  const [users, setUsers] = useState({
    userName: "",
    city: "",
    contact: "",
    dob: "",
  });

  useEffect(() => {
    let panels = gsap.utils.toArray(".panel"),
      scrollTween;

    function goToSection(i) {
      scrollTween = gsap.to(window, {
        scrollTo: { y: i * panels.innerHeight, autoKill: false },
        duration: 1,
        onComplete: () => (scrollTween = null),
        overwrite: true,
      });
    }

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=200%",
        onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
      });
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: 1 / (panels.length - 1),
    });
  }, []);

  useEffect(() => {
    // window.location.reload();
    const fetchImage = async () => {
      const fileref = ref(storage, currentUser.uid + "/profile.png");
      const photoUrl = await getDownloadURL(fileref);
      setImageUrl(photoUrl);
    };

    const fetchPosts = async () => {
      const response = query(collection(db, "posts"));
      const snapshot = await getDocs(response);
      snapshot.docs.forEach((doc) => {
        setPosts((prev) => [
          ...prev,
          {
            name: doc.data().userName,
            post: doc.data().postImage,
            userPicture: doc.data().profileImage,
            time: doc.data().timeOfPost,
          },
        ]);
      });
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const userData = snapshot.data();
        setUsers({
          userName: userData.displayName,
          city: userData.city,
          contact: userData.phone,
          dob: userData.dateOfBirth,
        });
      }
    });

    fetchImage();
    fetchPosts();
  }, []);

  console.log(users);
  console.log(posts);

  const myButtonClickHandler = () => {
    visibility === true ? setVisibility(false) : setVisibility(true);
  };

  const postButtonHandler = () => {
    console.log("Post button clicked now do next step !");
  };

  return (
    <React.Fragment>
      {posts
        .slice(1)
        .reverse()
        .map((data, key) => (
          <section
            className="panel"
            style={{
              backgroundColor: "transparent",
              padding: "0",
              backdropFilter: "blur(100px)",
            }}
            key={key}
          >
            <img
              src={data.post}
              style={{
                width: "1440px",
                height: "789px",
                objectFit: "cover",
                objectPosition: "20% 10%",
                borderRadius: "15px",
              }}
              alt=""
            />
            <div style={{ position: "absolute", top: "0px", left: "0px" }}>
              <div className="OUDC">
                <div className="userDetail">
                  <div className="imageCircle">
                    <img src={data.userPicture} alt="userimage" />
                  </div>
                  <p className="userEmail">@{data.name}</p>
                  <p className="postTime">{data.time}</p>
                  <div className="icons">
                    <button>
                      <img
                        src={ChatTeardrop}
                        alt=""
                        height="30px"
                        width="30px"
                      />
                    </button>
                    <button>
                      <img src={ArrowUp} alt="" height="32px" width="32px" />
                    </button>
                    <button>
                      <img src={PaperClip} alt="" height="32px" width="32px" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                color: "white",
                bottom: "50px",
                left: "670px",
              }}
            >
              <div className="outerArea">
                {visibility && (
                  <div className="menu">
                    <MyButtonMenu toggle={props.toggle} />
                  </div>
                )}
                <div className="horizonArea"></div>
                <div className="myButton">
                  <img
                    src={imageUrl}
                    onClick={myButtonClickHandler}
                    alt="profilePicture"
                  />
                </div>
              </div>
            </div>
            <div className="PBOA">
              <button className="postButton" onClick={postButtonHandler}>
                +
              </button>
            </div>
          </section>
        ))}
    </React.Fragment>
  );
};
