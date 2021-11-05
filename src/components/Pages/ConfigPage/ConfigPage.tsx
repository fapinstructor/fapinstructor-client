import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";

import { useAuth0 } from "@/providers/AuthProvider";
import { GAME_CONFIG_SCHEMA } from "./GAME_CONFIG_SCHEMA";
import store from "@/store";
import { GameConfig } from "@/configureStore";
import theme from "@/theme";
import Footer from "@/components/organisms/Footer";
import ShareGame from "@/components/organisms/ShareGame";
import AutoFocusFieldErrors from "@/components/organisms/AutoFocusFieldErrors";
import Stack from "@/components/templates/Stack";
import Cluster from "@/components/templates/Cluster";
import RuinedOrgasmsStep from "./components/Form/RuinedOrgasmsStep";
import PostOrgasmTortureStep from "./components/Form/PostOrgasmTortureStep";
import TaskStep from "./components/Form/TaskStep";
import MediaStep from "./components/Form/MediaStep";
import OrgasmStep from "./components/Form/OrgasmStep";
import EdgingStep from "./components/Form/EdgingStep";
import StrokeStep from "./components/Form/StrokeStep";
import GameDurationStep from "./components/Form/GameDurationStep";
import ButtonWithHelperText from "@/components/molecules/buttons/ButtonWithHelperText";
import SupportSiteBanner from "@/components/atoms/SupportSiteBanner";
import { Head } from "@/components/Head";

const StyledForm = styled(Form)`
  padding-top: 2rem;
  display: grid;
  grid-auto-rows: min-content;

  grid-template-columns: 1fr;
  grid-column-gap: 16;
  grid-template-columns: min(60ch, calc(100% - 32px));
  justify-content: center;

  @media screen and (${theme.breakpoint.desktop.up}) {
    grid-template-columns: 1fr 1.5fr 1fr;

    & > * {
      grid-column: 2;
    }
  }
`;

export default function ConfigPage() {
  const history = useHistory();
  const { user } = useAuth0();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Head title="Config" />
      <Formik<GameConfig>
        initialValues={store.config}
        validationSchema={GAME_CONFIG_SCHEMA}
        onSubmit={async (formValues) => {
          store.config = formValues;
        }}
      >
        {({ submitForm, isValid }) => {
          return (
            <AutoFocusFieldErrors>
              <StyledForm>
                <Stack>
                  <SupportSiteBanner />
                  <Typography variant="h2" component="h1" color="secondary">
                    Create a game
                  </Typography>
                  <Typography color="secondary" variant="body1">
                    Tweak your desired settings below to create any desired
                    experience.
                  </Typography>
                  <GameDurationStep />
                  <MediaStep />
                  <StrokeStep />
                  <OrgasmStep />
                  <EdgingStep />
                  <RuinedOrgasmsStep />
                  <PostOrgasmTortureStep />
                  <TaskStep />
                  <Box p={3}>
                    <Cluster>
                      <Button
                        title="Starts the game."
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          await submitForm();
                          isValid && history.push("/game");
                        }}
                      >
                        Start
                      </Button>
                      <ButtonWithHelperText
                        variant="contained"
                        disabled={!user}
                        color="secondary"
                        helperText={!user ? "*Requires login" : ""}
                        onClick={async () => {
                          await submitForm();
                          isValid && setOpen(true);
                        }}
                      >
                        Share Game
                      </ButtonWithHelperText>
                      <ShareGame open={open} onClose={() => setOpen(false)} />
                    </Cluster>
                  </Box>
                </Stack>
              </StyledForm>
            </AutoFocusFieldErrors>
          );
        }}
      </Formik>
      <Footer />
    </>
  );
}
