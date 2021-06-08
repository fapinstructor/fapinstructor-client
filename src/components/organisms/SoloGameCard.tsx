import React from "react";
import { Button } from "@material-ui/core";
import NodeRow from "components/templates/NodeRow";
import BackToConfigButton from "components/molecules/buttons/BackToConfigButton";

export type SoloGameCardProps = {
  onStart: () => void;
};

export default function SoloGameCard({ onStart }: SoloGameCardProps) {
  return (
    <NodeRow>
      <Button onClick={onStart} variant="contained" color="secondary">
        start game
      </Button>
      <BackToConfigButton />
    </NodeRow>
  );
}
