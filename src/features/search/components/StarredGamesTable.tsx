import { useAuth0 } from "@auth0/auth0-react";

import GamesTable from "./GamesTable";

export default function StarredGamesTable() {
  const { user } = useAuth0();

  return <GamesTable starredBy={user?.sub} />;
}
