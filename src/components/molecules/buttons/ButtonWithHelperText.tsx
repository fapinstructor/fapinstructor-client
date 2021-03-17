import React from "react";
import { Button, Box, FormHelperText, ButtonProps } from "@material-ui/core";

export type ButtonWithHelperTextProps = ButtonProps & {
  helperText: string;
};

export default function ButtonWithHelperText({
  helperText,
  ...props
}: ButtonWithHelperTextProps) {
  return (
    <Box display="inline-flex" flexDirection="column" alignItems="center">
      <Button {...props}>Share Game</Button>
      <FormHelperText>{helperText}</FormHelperText>
    </Box>
  );
}
