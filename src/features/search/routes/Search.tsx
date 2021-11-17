import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import HistoryIcon from "@material-ui/icons/History";
import CreateIcon from "@material-ui/icons/Create";
import { Tabs, Tab, Paper } from "@material-ui/core";
import Star from "@material-ui/icons/Star";

import { Head } from "@/components/Head";
import { AuthTab, TabPanel } from "@/components/Elements";

import GamesTable from "../components/GamesTable";
import StarredGamesTable from "../components/StarredGamesTable";
import CreatedGamesTable from "../components/CreatedGamesTable";
import PlayedGamesTable from "../components/PlayedGamesTable";

export function Search() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<unknown>, tab: number) => {
    setActiveTab(tab);
  };

  return (
    <Paper square>
      <Head title="Search" />
      <Paper square>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Find Games" icon={<SearchIcon />} />
          <AuthTab label="Starred Games" icon={<Star />} />
          <AuthTab label="Created Games" icon={<CreateIcon />} />
          <AuthTab label="History" icon={<HistoryIcon />} />
        </Tabs>
      </Paper>
      <TabPanel value={activeTab} index={0}>
        <GamesTable />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <StarredGamesTable />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <CreatedGamesTable />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <PlayedGamesTable />
      </TabPanel>
    </Paper>
  );
}
