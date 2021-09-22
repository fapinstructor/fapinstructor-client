/**
 * Cannot use CSS variables within media queries so we hard-code them here instead.
 * Ref: https://github.com/w3c/csswg-drafts/issues/2627
 */
const mobile = "480px";
const tablet = "768px";
const desktop = "1200px";

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
