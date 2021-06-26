import React from "react";
import { User } from "@auth0/auth0-react";

type ProfileIconProps = {
  user: User;
};

export default function ProfileIcon({ user }: ProfileIconProps) {
  return (
    <img
      src={user.picture}
      style={{ width: 40, borderRadius: 50 }}
      alt="Profile"
    />
  );
}
