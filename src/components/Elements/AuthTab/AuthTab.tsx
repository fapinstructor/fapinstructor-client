import { Tab, TabProps, Tooltip } from "@material-ui/core";

import { useAuth0 } from "@/providers/AuthProvider";

export type AuthTabProps = TabProps;

export function AuthTab(props: TabProps) {
  const { isAuthenticated } = useAuth0();

  return (
    <Tooltip
      title="Please login"
      disableFocusListener={isAuthenticated}
      disableHoverListener={isAuthenticated}
      disableTouchListener={isAuthenticated}
    >
      <span>
        <Tab disabled={!isAuthenticated} {...props} />
      </span>
    </Tooltip>
  );
}
