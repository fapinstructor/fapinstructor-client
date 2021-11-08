import { Paper, Box, Typography } from "@material-ui/core";
import { User } from "@auth0/auth0-react";

import { ProfileIcon } from "@/components/Icons";

type ProfileCardProps = {
  user: User;
};

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Box component={Paper} display="flex" p={2} alignItems="center">
      <ProfileIcon user={user} />
      <Box ml={2}>
        <Typography>{user.nickname}</Typography>
      </Box>
    </Box>
  );
}
