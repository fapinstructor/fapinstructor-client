import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { green } from "@material-ui/core/colors";

import { MenuItem } from "@/components/Templates";
import useToggle from "@/hooks/useToggle";

import { useLocalMedia } from "../utils/local-media";

type FileSystemProps = {
  connected: boolean;
};

function FileSystemIcon({ connected }: FileSystemProps) {
  return (
    <FolderSpecialIcon style={{ color: connected ? green[500] : "black" }} />
  );
}

type FileSystemSelectorProps = {
  variant?: "icon" | "normal";
};

export function FileSystemSelector({
  variant = "normal",
}: FileSystemSelectorProps) {
  const [showModal, toggleModal] = useToggle();
  const [error, setError] = React.useState<string | null>();
  const [directoryHandles, { appendDirectoryHandle, removeDirectoryHandle }] =
    useLocalMedia();

  return (
    <>
      {variant === "normal" ? (
        <Button color="inherit" onClick={toggleModal}>
          <MenuItem
            title="File System"
            icon={<FileSystemIcon connected={directoryHandles.length > 0} />}
          />
        </Button>
      ) : (
        <IconButton color="inherit" onClick={toggleModal}>
          <FileSystemIcon connected={directoryHandles.length > 0} />
        </IconButton>
      )}
      <Dialog
        fullWidth
        open={showModal}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Local Media</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Pick folders from your local computer to use for carousel.
          </Typography>
          {!window.showDirectoryPicker ? (
            <Typography variant="subtitle2" color="secondary" gutterBottom>
              This feature is experimental and is only available on{" "}
              <a
                href="https://caniuse.com/native-filesystem-api"
                target="_blank"
                rel="noreferrer"
              >
                supported browsers.
              </a>
            </Typography>
          ) : (
            <>
              <Typography variant="caption" gutterBottom color="secondary">
                The browser will prompt you to grant permission to allow us
                access. Please note that we do not store, use, transfer any of
                the content you grant permission. We <b>only</b> use the files
                for displaying images in the carousel.
              </Typography>
              <Box mt={2}>
                <Typography variant="body2">Selected Folders:</Typography>
                <List dense>
                  {directoryHandles.map((directoryHandle) => (
                    <ListItem key={directoryHandle.name}>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary={directoryHandle.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            removeDirectoryHandle(directoryHandle);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}
          {error ? <Typography color="secondary">{error}</Typography> : null}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!window.showDirectoryPicker}
            variant="contained"
            color="primary"
            onClick={async () => {
              setError(null);

              try {
                const selectedDirectoryHandle =
                  await window.showDirectoryPicker();

                try {
                  await appendDirectoryHandle(selectedDirectoryHandle);
                } catch (error) {
                  if (error instanceof Error) {
                    setError(error.message);
                  }
                }
              } catch (error) {
                setError(
                  "An unexpected error has occured trying to select a directory."
                );
              }
            }}
          >
            Add folder
          </Button>
          <Button onClick={toggleModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
