import React, { useState, useRef } from "react";
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
import { Formik, Form, Field, yupToFormErrors, FormikHelpers } from "formik";
import TagsField from "components/molecules/TagsField";
import ButtonWithHelperText from "components/molecules/buttons/ButtonWithHelperText";
import {
  CREATE_GAME_SCHEMA,
  CreateGameRequest,
  CreateGameResponse,
} from "common/api/schemas/games";
import { useHistory } from "react-router-dom";
import Game from "common/types/Game";
import { useAuth0 } from "AuthProvider";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(),
  },
}));

export type ShareGameProps = {
  disabled: boolean;
  loading: boolean;
  game: Game;
  createGame: (request: CreateGameRequest) => Promise<CreateGameResponse>;
};

export default function ShareGame({
  disabled,
  // TODO: Should loading be used?
  loading,
  createGame,
}: ShareGameProps) {
  const { user } = useAuth0();
  const inputLink = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const [gameId, setGameId] = useState<string>();
  const [copyToolTipOpen, setCopyToolTipOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (
    values: CreateGameRequest,
    { setErrors }: FormikHelpers<CreateGameRequest>
  ) => {
    try {
      const res = await createGame(values);
      setGameId(res.id);
    } catch (err) {
      if (err?.response.status === 400) {
        setErrors(yupToFormErrors(err.response.data.error));
      } else {
        throw err;
      }
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
    setGameId(undefined);
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
            // TODO: // Why do we need to specify an empty string for typescript not to hate us
            tags: [""],
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
                    title={"Copied to Clipboard"}
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
