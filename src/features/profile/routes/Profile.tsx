import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button } from "@material-ui/core";

import { useAuth0 } from "@/providers/AuthProvider";
import { deleteProfile } from "@/common/store/currentUser";
import { Head } from "@/components/Head";
import Page from "@/components/atoms/Page";
import ProfileCard from "@/components/organisms/ProfileCard";
import DeleteProfileModal from "@/components/molecules/DeleteProfileModal";

export function Profile() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <Page>
      <Head title="Profile" />
      <Box mb={2}>{user && <ProfileCard user={user} />}</Box>
      <DeleteProfileModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          dispatch(deleteProfile());
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
