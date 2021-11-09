import { useDispatch } from "react-redux";
import { Button, ButtonProps, Tooltip } from "@material-ui/core";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";

import { useAuth0 } from "@/providers/AuthProvider";
import { toggleStar } from "@/common/store/games";

export type StarButtonProps = {
  gameId: string;
  starred: boolean;
  stars: number;
} & ButtonProps;

export function StarButton({
  gameId,
  stars,
  starred,
  ...buttonProps
}: StarButtonProps) {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Tooltip title={isAuthenticated ? "Click to star" : "Sign in to star"}>
      <span>
        <Button
          color="secondary"
          startIcon={starred ? <Star /> : <StarBorder />}
          onClick={() => {
            if (isAuthenticated) {
              dispatch(toggleStar(gameId));
            }
          }}
          {...buttonProps}
        >
          {stars}
        </Button>
      </span>
    </Tooltip>
  );
}
