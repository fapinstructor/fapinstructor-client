import { useCallback, useEffect } from "react";
import * as yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ContactlessIcon from "@material-ui/icons/Contactless";

import MenuItem from "@/components/templates/MenuItem";
import useToggle from "@/hooks/useToggle";
import { createNotification } from "@/game/engine/notification";
import { Severity } from "@/common/store/notifications";
import useStickyState from "@/hooks/useStickyState";
import useForceUpdate from "@/hooks/useForceUpdate";

import { handy } from "../../api/handy";

const CONNECT_HANDY_SCHEMA = yup.object().shape({
  connectionKey: yup
    .string()
    .min(5, "Min key length is 5")
    .max(64, "Max key length is 64")
    .required("Connection key is required!"),
});

type ConnectHandyRequest = {
  connectionKey: string;
};

type ConnectHandyProps = {
  variant?: "icon" | "normal";
};

type HandyIconProps = {
  connected: boolean;
};

function HandyIcon({ connected }: HandyIconProps) {
  return (
    <ContactlessIcon style={{ color: connected ? green[500] : "black" }} />
  );
}

export function ConnectHandy({ variant = "normal" }: ConnectHandyProps) {
  const forceUpdate = useForceUpdate();
  const [showModal, toggleModal] = useToggle();
  const [handyConnectionKey, setHandyConnectionKey] = useStickyState<string>(
    "",
    "handy"
  );

  const observeHandyConnection = useCallback(
    (connected: boolean) => {
      forceUpdate();

      if (connected) {
        createNotification({
          message:
            "The connection to your Handy device has been reestablished.",
          severity: Severity.INFO,
        });
      }

      if (!connected) {
        createNotification({
          message: "The connection has been lost to your Handy device.",
          severity: Severity.ERROR,
        });
      }
    },
    [forceUpdate]
  );

  // Attempt to reestablish connection upon mount.
  useEffect(() => {
    if (handyConnectionKey && !handy.connected) {
      handy
        .connect(handyConnectionKey)
        .then(() => {
          handy.subscribe(observeHandyConnection);
          forceUpdate();
        })
        .catch((error) => {
          createNotification({
            message: error.message,
            severity: Severity.ERROR,
          });
        });
    } else if (handy.connected) {
      /**
       * If the handy is already connected, periodically check to
       * see if the connection is still established.
       */
      handy.subscribe(observeHandyConnection);
    }

    return () => handy.unsubscribe(observeHandyConnection);
  }, [handyConnectionKey, observeHandyConnection, forceUpdate]);

  return (
    <>
      <Tooltip
        title={
          handy.connected ? "Handy is connected" : "Handy is not connected"
        }
        placement="bottom"
      >
        {variant === "normal" ? (
          <Button color="inherit" onClick={toggleModal}>
            <MenuItem
              title="Connect Handy"
              icon={<HandyIcon connected={handy.connected} />}
            />
          </Button>
        ) : (
          <IconButton color="inherit" onClick={toggleModal}>
            <HandyIcon connected={handy.connected} />
          </IconButton>
        )}
      </Tooltip>
      <Dialog
        fullWidth
        open={showModal}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          {handy.connected ? (
            <> Handy is connected</>
          ) : (
            <Box display="flex" justifyContent="space-between">
              Handy is not connected
              <Link
                href="https://www.handysetup.com/en/"
                target="_blank"
                rel="noopener"
              >
                Need Help?
              </Link>
            </Box>
          )}
        </DialogTitle>
        <Formik
          validationSchema={CONNECT_HANDY_SCHEMA}
          initialValues={{
            connectionKey: handyConnectionKey,
          }}
          onSubmit={async (
            { connectionKey }: ConnectHandyRequest,
            { setErrors }: FormikHelpers<ConnectHandyRequest>
          ) => {
            try {
              if (handy.connected) {
                throw new Error("Your Handy device is already connected.");
              }

              await handy.connect(connectionKey);
              setHandyConnectionKey(connectionKey);
              handy.subscribe(observeHandyConnection);
            } catch (error) {
              setErrors({
                connectionKey: error.message,
              });
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            touched,
            isSubmitting,
            errors,
            values,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  id="connectionKey"
                  name="connectionKey"
                  label="Connection Key"
                  fullWidth
                  value={values.connectionKey}
                  onChange={handleChange}
                  error={touched.connectionKey && Boolean(errors.connectionKey)}
                  helperText={touched.connectionKey && errors.connectionKey}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  Connect
                </Button>
                <Button
                  onClick={() => {
                    setHandyConnectionKey("");
                    handy.disconnect();
                    setFieldValue("connectionKey", "");
                  }}
                  disabled={!handyConnectionKey}
                >
                  Disconnect
                </Button>
                <Button onClick={toggleModal}>Close</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
