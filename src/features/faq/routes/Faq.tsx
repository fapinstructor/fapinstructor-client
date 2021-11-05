import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";

import { PUBLIC_URL } from "@/config";
import Page from "@/components/atoms/Page";
import { Head } from "@/components/Head";

const FaqMD = `${PUBLIC_URL}/FAQ.md`;

export function Faq() {
  const [changeLogMD, setChangeLogMD] = useState("");

  useEffect(() => {
    fetch(FaqMD)
      .then((res) => res.text())
      .then(setChangeLogMD);
  }, []);

  return (
    <Page className="markdown-body">
      <Head title="FAQ" />
      <ReactMarkdown>{changeLogMD}</ReactMarkdown>
    </Page>
  );
}
