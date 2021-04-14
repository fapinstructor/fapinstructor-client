import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export type DeleteProfileModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteProfileModal({
  open,
  onConfirm,
  onCancel,
}: DeleteProfileModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete your account?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" component="span">
          You will irreverisbly lose all of the following:
          <ul>
            <li>Played game history</li>
            <li>Created games, both private and public</li>
            <li>Entire profile and account</li>
          </ul>
          Are you sure you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          color="primary"
          variant="contained"
          autoFocus
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
