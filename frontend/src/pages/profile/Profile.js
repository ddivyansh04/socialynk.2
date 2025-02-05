import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  const username = useParams().username;

  useEffect(() => {
    // const fetchUser = async () => {
    //   const res = await axios.get(`/users?username=${username}`);
    //   setUser(res.data);
    // };
    // const fetchUser = async () => {
    //   try {
    //     const res = await axios.get(`/users?username=${username}`);
    //     console.log("API Response:", res.data); // Check this
    //     setUser(res.data); // Ensure this contains the correct user object
    //   } catch (err) {
    //     console.error("Error fetching user:", err);
    //   }
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        console.log("API Response:", res.data); // Debug API response
        // console.log(res.useParams);
        
        // Check if res.data contains the expected user object
        if (typeof res.data === "object" && res.data.username) {
          setUser(res.data); // Correct response
        } else {
          console.error("Unexpected API Response Format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {user ? (
                <img className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : PF + "person/noCover.png"
                  }
                  alt=""
                />
              ) : (
                <img
                  src={PF + "person/noCover.png"}
                  alt="Default Cover"
                  className="profileCoverImg"
                />
              )}
              {user ? (
                <img className="profileUserImg"
                  src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                  alt=""
                />
              ) : (
                <img
                  src={PF + "person/noAvatar.png"}
                  alt="Default Avatar"
                  className="profileUserImg"
                />
              )}
            </div>
            <div className="profileInfo">
              {/* <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span> */}
              <h4 className="profileInfoName">
                {user?.username || "Username not found"}
              </h4>
              <span className="profileInfoDesc">
                {user?.desc || "Description not available"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}