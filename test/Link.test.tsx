import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { First } from "../src/components/Link";

describe("First Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<First />);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
