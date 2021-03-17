import React from "react";
import { Box } from "@material-ui/core";
import Page from "components/atoms/Page";
import ProfileCard from "components/organisms/ProfileCard";
import { useAuth0 } from "AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth0();

  return (
    <Page>
      <Box mb={2}>
        <ProfileCard user={user} />
      </Box>
    </Page>
  );
}
