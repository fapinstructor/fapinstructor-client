import * as React from "react";
import { Grid } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

import Group from "components/molecules/Group";
import ProbabilityField from "../ProbabilityField";
import balanceArray from "utils/balanceArray";
import PostOrgasmTortureDurationField from "../PostOrgasmTortureDurationField";
import RuinedOrgasmsRangeField from "../RuinedOrgasmsRangeField";
import CooldownField from "../CooldownField";

const ONE_HUNDRED_PERCENT = 100;

type Sliders = {
  orgasmProbability: number;
  deniedProbability: number;
  ruinedProbability: number;
};

export default function OrgasmStep() {
  const form = useFormikContext<{
    probabilities: Sliders;
  }>();
  const [enableRuinedOrgasms] = useField<boolean>("enableRuinedOrgasms");

  // Generate a list of enabled probabilities
  const [lockedProbabilities, setLockedProbabilities] = React.useState({
    "probabilities.orgasmProbability": false,
    "probabilities.deniedProbability": false,
    "probabilities.ruinedProbability": false,
  });
  const [lockedProbabilitySum, setLockedProbabilitySum] =
    React.useState<number>();
  const [disableProbabilities, setDisableProbabilities] = React.useState(false);

  React.useEffect(() => {
    const onlyLockedProbabilities = Object.entries(lockedProbabilities).filter(
      ([_, locked]) => locked
    );

    setDisableProbabilities(
      onlyLockedProbabilities.length + 1 ===
        Object.entries(lockedProbabilities).length
    );

    const lockedProbabilitySum = onlyLockedProbabilities.reduce(
      (a, [probabilityName]) => {
        return a + form.getFieldProps(probabilityName).value;
      },
      0
    );

    setLockedProbabilitySum(
      lockedProbabilitySum
        ? ONE_HUNDRED_PERCENT - lockedProbabilitySum
        : undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockedProbabilities, setLockedProbabilitySum, setDisableProbabilities]);

  function handleProbabilityChange(name: string, probability: number) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const probabilityKey = name.split(".").pop()!;
    const previousProbability =
      form.values.probabilities[probabilityKey as keyof Sliders];
    const probabilityDiff = Math.round(probability - previousProbability);

    const probabilities = Object.entries(form.values.probabilities)
      // Remove any locked probabilities from balancing.
      .filter(
        ([name]) =>
          !lockedProbabilities[
            `probabilities.${name}` as keyof typeof lockedProbabilities
          ]
      );

    const rebalancedProbabilities = balanceArray(
      probabilities.findIndex(([k]) => k === probabilityKey),
      probabilityDiff,
      probabilities.map(([, v]) => v)
    );

    probabilities.forEach(([key], index) => {
      form.setFieldValue(
        `probabilities.${key}`,
        rebalancedProbabilities[index]
      );
    });
  }

  function handleProbabilityToggle(name: string, locked: boolean) {
    setLockedProbabilities({
      ...lockedProbabilities,
      [name]: locked,
    });
  }

  return (
    <Group title="Game Ending Orgasm">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ProbabilityField
            name="probabilities.orgasmProbability"
            label="Probability of an orgasm"
            onChange={handleProbabilityChange}
            disabled={disableProbabilities}
            locked={lockedProbabilities["probabilities.orgasmProbability"]}
            onToggleLock={handleProbabilityToggle}
            cap={lockedProbabilitySum}
          />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <ProbabilityField
            name="probabilities.deniedProbability"
            label="Probability to be denied an orgasm"
            onChange={handleProbabilityChange}
            disabled={disableProbabilities}
            locked={lockedProbabilities["probabilities.deniedProbability"]}
            onToggleLock={handleProbabilityToggle}
            cap={lockedProbabilitySum}
          />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <ProbabilityField
            name="probabilities.ruinedProbability"
            label="Probability of a ruined orgasm"
            disabled={disableProbabilities}
            onChange={handleProbabilityChange}
            locked={lockedProbabilities["probabilities.ruinedProbability"]}
            onToggleLock={handleProbabilityToggle}
            cap={lockedProbabilitySum}
          />
        </Grid>
        <Grid item xs={8} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <PostOrgasmTortureDurationField />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <RuinedOrgasmsRangeField />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <CooldownField
            name="ruinCooldown"
            label="Ruin Cooldown"
            helperText="Length of time to rest before the game continues."
            disabled={!enableRuinedOrgasms.value}
          />
        </Grid>
        <Grid item xs={8} />
      </Grid>
    </Group>
  );
}
