import { useState } from "react";
import { Box, Button } from "@material-ui/core";
import Page from "@/components/atoms/Page";
import ProfileCard from "@/components/organisms/ProfileCard";
import { useAuth0 } from "@/providers/AuthProvider";
import DeleteProfileModal from "@/components/molecules/DeleteProfileModal";
import { useDispatch } from "react-redux";
import { deleteProfile } from "@/common/store/currentUser";
import { Head } from "@/components/Head";

export default function ProfilePage() {
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
