import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

import avatar from "../assets/images/avatar.jpg";
import profileBgImg from "../assets/images/profile-bg.jpg";

//auth
import { AuthContext } from "./../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          <section>
            <div class="profile-card">
              <div class="card-image">
                <img src={profileBgImg} alt="" />
              </div>
              <div class="profile-image">
                <img src={avatar} alt="" />
              </div>
              <div class="card-content">
                <h3>My Profile</h3>
                <div className="profile__detail">
                  <div className="profile-details__container d-flex">
                    <p>Name : </p>
                    <p>{user.username}</p>
                  </div>
                  <div className="profile-details__container d-flex">
                    <p>Email : </p>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>{navigate("/")}</>
      )}
    </>
  );
};

export default Profile;
