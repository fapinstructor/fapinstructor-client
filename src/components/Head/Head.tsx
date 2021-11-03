import { Helmet } from "react-helmet";

type HeadProps = {
  title?: string;
  description?: string;
};

export function Head({ title = "", description = "" }: HeadProps = {}) {
  return (
    <Helmet
      title={title ? `${title} | Fap Instructor` : undefined}
      defaultTitle="Bulletproof React"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
}
