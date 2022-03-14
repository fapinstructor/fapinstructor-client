import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";

import store from "@/store";
import BackgroundImage from "@/assets/images/background.jpg";
import { SupportSiteBanner } from "@/components/SupportSiteBanner";
import { Head } from "@/components/Head";
import { NavBar } from "@/components/NavBar";
import { Cluster } from "@/components/Templates";

import { BookmarkList } from "../components/BookmarkList";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
});

export function End() {
  const classes = useStyles();
  const navigate = useNavigate();

  if (!store.game) {
    // If the page is refreshed, we lose game state, so redirect to home
    navigate("/");
    return null;
  }

  const sendBookmarks = async () => {   
    let bmList = "";

    store.game.bookmarks.forEach(bookmark => {
      if (bmList !==""){
        bmList = bmList + "\n" + bookmark.href;
      } else {
        bmList = bookmark.href;
      }     
    });
    await navigator.clipboard.writeText(bmList);
    alert('Bookmarks copied');
  };

  const downloadBookmarks = async () => {   
    let bmList = "";

    store.game.bookmarks.forEach(bookmark => {
      if (bmList !==""){
        bmList = bmList + "\n" + bookmark.href;
      } else {
        bmList = bookmark.href;
      }     
    });
    
    const element = document.createElement("a");
    const file = new Blob([bmList], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);

    const today = new Date();
    const dateStr = today.getFullYear() + "_" + today.getMonth() + "_" + today.getDate() + " " + today.toLocaleTimeString()

    element.download = "fapInstructorBookmarks_" + dateStr + ".txt";
    document.body.appendChild(element);
    element.click();
  };


  return (
    <>
      <NavBar />
      <div className={classes.root}>
        <Head title="End" />
        <SupportSiteBanner />
        <br />
        <Typography
          gutterBottom
          variant="h2"
          style={{ fontFamily: "'Damion', cursive" }}
        >
          The End
        </Typography>
        <Typography variant="h6" noWrap gutterBottom>
          Bookmarks
        </Typography>
        <BookmarkList
          bookmarks={store.game.bookmarks.map((bookmark) => ({
            href: bookmark.href,
            src: bookmark.src,
          }))}
        />
        <br />

        <Box p={3}>
          <Cluster>
            <Button onClick={sendBookmarks} variant="contained" color="primary">
              Copy to clipboard 
            </Button>

            <Button onClick={downloadBookmarks} variant="contained" color="primary">
              Save text File
            </Button>
          </Cluster>   
        </Box>      
      </div>
    </>
  );
}
