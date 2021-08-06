/**
 * Cannot use CSS variables within media queries so we hard-code them here instead.
 * Ref: https://github.com/w3c/csswg-drafts/issues/2627
 */
const mobile = "36rem";
const tablet = "48rem";
const desktop = "62rem";

const breakpoint = {
  mobile: {
    up: `min-width: ${mobile}`,
    down: `max-width: ${mobile}`,
  },
  tablet: {
    up: `min-width: ${tablet}`,
    down: `max-width: ${tablet}`,
  },
  desktop: {
    up: `min-width: ${desktop}`,
    down: `max-width: ${desktop}`,
  },
};

export default { breakpoint };
