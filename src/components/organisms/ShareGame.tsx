import { useState, useRef } from "react";
import store from "store";
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
import SwitchWithLabel from "components/atoms/SwitchWithLabel";
import { Formik, Form, Field, FormikHelpers } from "formik";
import TagsField from "components/molecules/TagsField";
import ButtonWithHelperText from "components/molecules/buttons/ButtonWithHelperText";
import {
  CREATE_GAME_SCHEMA,
  CreateGameRequest,
} from "common/api/schemas/games";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { clearGameId, createGame, selectGameId } from "common/store/createGame";
import { createNotification, Severity } from "common/store/notifications";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(),
  },
}));

export type ShareGameProps = {
  disabled: boolean;
  /* createGame: (request: CreateGameRequest) => Promise<CreateGameResponse>; */
};

export default function ShareGame({ disabled }: ShareGameProps) {
  const dispatch = useDispatch();
  const gameId = useSelector(selectGameId);
  const { user } = useAuth0();
  const inputLink = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const [copyToolTipOpen, setCopyToolTipOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (
    values: CreateGameRequest,
    { setErrors }: FormikHelpers<CreateGameRequest>
  ) => {
    try {
      await dispatch(createGame(values));
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearGameId());
  };

  return (
    <>
      <ButtonWithHelperText
        variant="contained"
        disabled={!user}
        color="secondary"
        onClick={handleClickOpen}
        helperText={!user ? "*Requires login" : ""}
      >
        Share Game
      </ButtonWithHelperText>
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
                      <FormHelperText>
                        Makes the game searchable.
                      </FormHelperText>
                    </Box>
                  </>
                )}
                {Boolean(gameId) && (
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel htmlFor="game-link">
                        Shareable Link
                      </InputLabel>
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
                    title={"Starts the game."}
                    variant="contained"
                    color="primary"
                    onClick={handleStartGame}
                    disabled={disabled && !Boolean(gameId)}
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
                      disabled={disabled && !Boolean(gameId)}
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
    </>
  );
}
