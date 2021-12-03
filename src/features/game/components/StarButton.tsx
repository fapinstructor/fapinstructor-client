import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonProps, Tooltip } from "@material-ui/core";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";

import { useAddStar, useDeleteStar } from "../api/toggleStar";

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
  const { user, isAuthenticated } = useAuth0();

  const addStarMutation = useAddStar();
  const deleteStarMutation = useDeleteStar();

  return (
    <Tooltip title={isAuthenticated ? "Click to star" : "Sign in to star"}>
      <span>
        <Button
          color="secondary"
          startIcon={starred ? <Star /> : <StarBorder />}
          onClick={() => {
            if (isAuthenticated && user?.sub) {
              if (starred) {
                deleteStarMutation.mutate({ profileId: user.sub, gameId });
              } else {
                addStarMutation.mutate({ profileId: user.sub, gameId });
              }
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
