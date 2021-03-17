import React from "react";
import Typography from "@material-ui/core/Typography";

export type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Typography variant="subtitle2" color="secondary">
      {message}
    </Typography>
  );
}
