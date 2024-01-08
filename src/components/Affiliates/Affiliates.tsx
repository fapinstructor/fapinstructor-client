import { Typography } from "@material-ui/core";
import styled from "styled-components/macro";

import LovenseBannerImage from "@/assets/images/lovense-banner.png";

export function Affiliates() {
  return (
    <a
      href="https://cdn.lovense.com/UploadFiles/web/affiliate/20221122/d501f7336a204a1ca5e54082bb5e0a9a.png"
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexDirection: "column",
          }}
        >
          <Lovensebanner />
          <LovenseContent />
        </div>
      </div>
    </a>
  );
}

export const Lovensebanner = styled.img.attrs({
  src: LovenseBannerImage,
  alt: "Opens the Lovense affiliate site within a new tab",
})`
  max-width: 100vw;
`;

function LovenseContent() {
  return (
    <Typography variant="body2" style={{ textAlign: "center" }}>
      Click here to support our community and server all while also getting
      great discounts.
    </Typography>
  );
}
