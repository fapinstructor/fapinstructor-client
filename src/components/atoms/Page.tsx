import React from "react";
import { Box, BoxProps } from "@material-ui/core";

export type PageProps = BoxProps;

export default function Page(props: PageProps) {
  return <Box m={5} {...props} />;
}
