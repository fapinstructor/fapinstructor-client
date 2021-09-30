import * as React from "react";
import { useFormikContext } from "formik";

import balanceArray from "utils/balanceArray";
import Group from "components/molecules/Group";
import ProbabilityField from "./components/ProbabilityField";
import { GameConfig } from "configureStore";

const ONE_HUNDRED_PERCENT = 100;

type Sliders = {
  orgasmProbability: number;
  deniedProbability: number;
  ruinedProbability: number;
};

export default function OrgasmStep() {
  const form = useFormikContext<GameConfig>();

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
    <Group title="Game Finale">
      <ProbabilityField
        name="probabilities.orgasmProbability"
        label="Probability of an orgasm"
        onChange={handleProbabilityChange}
        disabled={disableProbabilities}
        locked={lockedProbabilities["probabilities.orgasmProbability"]}
        onToggleLock={handleProbabilityToggle}
        cap={lockedProbabilitySum}
      />
      <ProbabilityField
        name="probabilities.deniedProbability"
        label="Probability to be denied an orgasm"
        onChange={handleProbabilityChange}
        disabled={disableProbabilities}
        locked={lockedProbabilities["probabilities.deniedProbability"]}
        onToggleLock={handleProbabilityToggle}
        cap={lockedProbabilitySum}
      />
      <ProbabilityField
        name="probabilities.ruinedProbability"
        label="Probability of a ruined orgasm"
        disabled={disableProbabilities}
        onChange={handleProbabilityChange}
        locked={lockedProbabilities["probabilities.ruinedProbability"]}
        onToggleLock={handleProbabilityToggle}
        cap={lockedProbabilitySum}
      />
    </Group>
  );
}
