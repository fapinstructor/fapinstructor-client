import { useSelector } from "react-redux";
import { Button, ButtonProps, Tooltip } from "@material-ui/core";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";

import { selectProfile } from "@/common/store/currentUser";
import { useAuth0 } from "@/providers/AuthProvider";

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
  const { isAuthenticated } = useAuth0();
  const profile = useSelector(selectProfile);

  const addStarMutation = useAddStar();
  const deleteStarMutation = useDeleteStar();

  return (
    <Tooltip title={isAuthenticated ? "Click to star" : "Sign in to star"}>
      <span>
        <Button
          color="secondary"
          startIcon={starred ? <Star /> : <StarBorder />}
          onClick={() => {
            if (isAuthenticated && profile) {
              if (starred) {
                deleteStarMutation.mutate({ profileId: profile?.id, gameId });
              } else {
                addStarMutation.mutate({ profileId: profile?.id, gameId });
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
