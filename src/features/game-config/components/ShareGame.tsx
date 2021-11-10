import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Tooltip,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FilledInput,
  LinearProgress,
  Box,
  FormHelperText,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import store from "@/store";
import { SwitchWithLabel } from "@/components/Form";
import { TagsField } from "@/features/tags";
import { createNotification, Severity } from "@/common/store/notifications";

import { CREATE_GAME_SCHEMA } from "../schemas/CREATE_GAME_SCHEMA";
import { CreateGameDTO, useCreateGame } from "../api/createGame";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(),
  },
}));

export type ShareGameProps = {
  open: boolean;
  onClose: () => void;
};

export function ShareGame({ open, onClose }: ShareGameProps) {
  const createGame = useCreateGame();
  const dispatch = useDispatch();
  /* const gameId = useSelector(selectGameId); */
  const inputLink = React.useRef<HTMLInputElement>();
  const [copyToolTipOpen, setCopyToolTipOpen] = React.useState(false);
  const [gameId, setGameId] = React.useState<string>();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (values: CreateGameDTO) => {
    try {
      const { id: gameId } = await createGame.mutateAsync(values);
      setGameId(gameId);
    } catch (error) {
      dispatch(
        createNotification({
          message: `Error creating game: ${error}`,
          duration: -1,
          severity: Severity.ERROR,
        })
      );
    }
  };

  const handleCopyLink = () => {
    inputLink?.current?.focus();
    inputLink?.current?.select();
    document.execCommand("copy");
    setCopyToolTipOpen(true);
  };

  const handleStartGame = () => {
    history.push(`/game/${gameId}`);
  };

  const handleToolTipOpen = () => {
    setCopyToolTipOpen(false);
  };

  const handleClose = () => {
    setGameId(undefined);
    onClose();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Share Game</DialogTitle>
      <Formik
        initialValues={{
          title: "",
          tags: [] as string[],
          isPublic: true,
          config: store.config,
        }}
        onSubmit={handleSubmit}
        validationSchema={CREATE_GAME_SCHEMA}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              {!Boolean(gameId) && (
                <>
                  <Box mb={2}>
                    <Field
                      name="title"
                      component={TextField}
                      label="Title"
                      required
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <TagsField />
                  </Box>
                  <Box mb={2}>
                    <Field
                      name="isPublic"
                      type="checkbox"
                      component={SwitchWithLabel}
                      Label={{ label: "Public" }}
                    />
                    <FormHelperText>Makes the game searchable.</FormHelperText>
                  </Box>
                </>
              )}
              {Boolean(gameId) && (
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel htmlFor="game-link">Shareable Link</InputLabel>
                    <FilledInput
                      id="game-link"
                      value={`${window.location.host}/game/${gameId}`}
                      inputRef={inputLink}
                    />
                  </FormControl>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              {isSubmitting && <LinearProgress />}
              {!Boolean(gameId) && (
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Save Game
                </Button>
              )}
              {Boolean(gameId) && (
                <Button
                  title="Starts the game."
                  variant="contained"
                  color="primary"
                  onClick={handleStartGame}
                  disabled={!Boolean(gameId)}
                >
                  Play Game
                </Button>
              )}
              {Boolean(gameId) && (
                <Tooltip
                  id="generate-link-tooltip"
                  title="Copied to Clipboard"
                  leaveDelay={3000}
                  open={copyToolTipOpen}
                  onClose={handleToolTipOpen}
                  placement="bottom"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleCopyLink}
                    disabled={!Boolean(gameId)}
                  >
                    Copy Link
                  </Button>
                </Tooltip>
              )}
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
