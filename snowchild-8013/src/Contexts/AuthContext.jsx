import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebaseConfig";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (
    email,
    password,
    firstName,
    secondName,
    contact,
    userCity,
    dob,
    username,
    userPhoto
  ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        const fileref = ref(storage, cred.user.uid + "/profile.png");
        uploadBytes(fileref, userPhoto);

        setDoc(doc(db, "users", cred.user.uid), {
          displayName: firstName + " " + secondName,
          userName: username,
          useremail: email,
          city: userCity,
          phone: contact,
          dateOfBirth: dob,
        });
      }
    );
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log(cred);
    });
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
