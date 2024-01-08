import { Typography } from "@material-ui/core";
import styled from "styled-components/macro";

import LovenseBannerImage from "@/assets/images/lovense-banner.png";

export function Affiliates() {
  return (
    <a
      href="https://www.lovense.com/r/kb1zjm"
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
