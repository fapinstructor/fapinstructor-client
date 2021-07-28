import { render } from "test/test-utils";
import Route from "./Route";

describe("Route", () => {
  it("Should change the page title", () => {
    const title = "Test Page";

    render(<Route path="/" title={title} />);

    expect(document.title).toBe(title);
  });
});
