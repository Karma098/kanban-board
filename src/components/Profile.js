import React from "react";

const Profile = ({ user }) => {
  return <div className="user-avatar">{user?.charAt(0)}</div>;
};

export default Profile;
