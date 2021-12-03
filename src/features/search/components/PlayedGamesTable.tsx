import { useAuth0 } from "@auth0/auth0-react";

import GamesTable from "./GamesTable";

export default function PlayedGamesTable() {
  const { user } = useAuth0();

  return <GamesTable playedBy={user?.sub} />;
}
