import styled from "styled-components/macro";
import EuroFightBanner from "images/eurofights-banner-tf.png";

const EuroFightsBanner = styled.img.attrs({
  src: EuroFightBanner,
  alt: "Opens Euro Fights partner site in a new tab",
})`
  width: 50vw;
  max-width: 900px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export default EuroFightsBanner;