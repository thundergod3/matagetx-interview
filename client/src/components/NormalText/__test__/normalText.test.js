import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NormalText from "..";

jest.setTimeout(120000);

describe("Normal Text", () => {
  test("Render Normal Text", async () => {
    render(<NormalText text="Test Normal Text" />);

    await expect(await screen.findByText(/test normal text/i)).toBeVisible();
  });
});
