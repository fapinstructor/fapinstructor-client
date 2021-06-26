import React from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import ProfileIcon from "components/molecules/icons/ProfileIcon";
import { User } from "@auth0/auth0-react";

export type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Box component={Paper} display="flex" p={2} alignItems="center">
      <ProfileIcon user={user} />
      <Box ml={2}>
        <Typography>{user.nickname}</Typography>
      </Box>
    </Box>
  );
}
