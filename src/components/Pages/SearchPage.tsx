import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import HistoryIcon from "@material-ui/icons/History";
import CreateIcon from "@material-ui/icons/Create";
import { Tabs, Tab, Paper } from "@material-ui/core";
import GamesTable from "components/organisms/GamesTable";
import CreatedGamesTable from "components/organisms/GamesTable/CreatedGamesTable";
import PlayedGamesTable from "components/organisms/GamesTable/PlayedGamesTable";
import TabPanel from "components/atoms/TabPanel";
import AuthTab from "components/atoms/AuthTab";

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, tab: number) => {
    setActiveTab(tab);
  };

  return (
    <Paper square>
      <Paper square>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Find Games" icon={<SearchIcon />} />
          <AuthTab label="Created Games" icon={<CreateIcon />} />
          <AuthTab label="History" icon={<HistoryIcon />} />
        </Tabs>
      </Paper>
      <TabPanel value={activeTab} index={0}>
        <GamesTable />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <CreatedGamesTable />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <PlayedGamesTable />
      </TabPanel>
    </Paper>
  );
}
