/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_FAPINSTRUCTOR_API: string;
      REACT_APP_AUTH0_DOMAIN: string;
      REACT_APP_AUTH0_CLIENT_ID: string;
      REACT_APP_AUTH0_AUDIENCE: string;
      // Debug flags
      REACT_APP_STATE_CHARTS: string;
    }
  }
}

const publicUrl = process.env.PUBLIC_URL;

const config = {
  fapinstructorApi: process.env.REACT_APP_FAPINSTRUCTOR_API,
  auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN,
  auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  auth0Audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  publicUrl,
  enableStateCharts: process.env.REACT_APP_STATE_CHARTS === "true",
};

export default config;
