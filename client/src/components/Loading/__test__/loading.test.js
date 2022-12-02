import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loading from "..";

jest.setTimeout(120000);

describe("Loading", () => {
  test("Render Loading", async () => {
    render(<Loading data-testid="loading" />);

    await expect(await screen.findByTestId("loading")).toBeInTheDocument();
  });
});
