import { Button, Typography } from "@material-ui/core";

import { Group } from "./Group";

export function FapInstructorAlphaBanner() {
  return (
    <Group
      title={
        <Typography variant="h6" color="secondary">
          🎉 Fap Instructor Alpha
        </Typography>
      }
      style={{ background: "#333", color: "#DDD" }}
    >
      <Typography>
        This site is getting old, so I'm building it from the ground up but on
        steroids.
      </Typography>
      <ul>
        <li>
          <Typography>
            🤯 A ridiculous amount of configuration options available to
            generate games.
          </Typography>
        </li>
        <li>
          <Typography>
            💪 A game builder where you can construct custom built games from
            scratch using a powerful game engine.
          </Typography>
        </li>
        <li>
          <Typography>
            👁️ Immersive porn scroller, chat bot for encouragement, and so much
            more to come.
          </Typography>
        </li>
      </ul>
      <Typography>
        Currently the alpha is{" "}
        <span style={{ fontWeight: "bold", color: "hotpink" }}>
          only available to Patreons ❤️
        </span>
        ! If you want to support the developer, provide direct feedback and gain
        access to the site check us out using the buttons below!
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Button
          target="_blank"
          color="secondary"
          variant="contained"
          href="https://www.patreon.com/fapinstructor"
          rel="noreferrer"
        >
          Sign up on Patreon
        </Button>
        <Button
          target="_blank"
          color="secondary"
          variant="contained"
          href="https://fapchallenger.com"
          rel="noreferrer"
        >
          Open Alpha Site
        </Button>
      </div>
    </Group>
  );
}
