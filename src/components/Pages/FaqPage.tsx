import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import config from "config";
import "github-markdown-css";
import Page from "components/atoms/Page";

const FaqMD = `${config.publicUrl}/FAQ.md`;

export default function ChangeLog() {
  const [changeLogMD, setChangeLogMD] = useState("");

  useEffect(() => {
    fetch(FaqMD)
      .then((res) => res.text())
      .then(setChangeLogMD);
  }, []);

  return (
    <Page className="markdown-body">
      <ReactMarkdown>{changeLogMD}</ReactMarkdown>
    </Page>
  );
}
