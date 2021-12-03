import { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import { Head } from "@/components/Head";
import { Page } from "@/components/Templates";

import { ProfileCard } from "../components/ProfileCard";
import { DeleteProfileModal } from "../components/DeleteProfileModal";
import { useDeleteProfile } from "../api/deleteProfile";

export function Profile() {
  const { user } = useAuth0();
  const deleteProfileMutation = useDeleteProfile();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!user) {
    throw new Error("Only logged in users are able to view this page.");
  }

  return (
    <Page>
      <Head title="Profile" />
      <Box mb={2}>
        <ProfileCard user={user} />
      </Box>
      <DeleteProfileModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          deleteProfileMutation.mutate();
        }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          setDeleteModalOpen(true);
        }}
      >
        Delete Account
      </Button>
    </Page>
  );
}
