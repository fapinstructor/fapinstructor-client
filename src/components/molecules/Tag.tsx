import React from "react";
import { Chip } from "@material-ui/core";

export type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return <Chip key={tag} label={tag} />;
}
