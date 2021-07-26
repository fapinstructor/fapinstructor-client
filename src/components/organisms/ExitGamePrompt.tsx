import { Prompt } from "react-router-dom";

export default function ExitGamePrompt() {
  return (
    <Prompt
      message={(location) => {
        return (
          location.pathname.startsWith("/endgame") ||
          "Are you sure you want to exit the game?"
        );
      }}
    />
  );
}
