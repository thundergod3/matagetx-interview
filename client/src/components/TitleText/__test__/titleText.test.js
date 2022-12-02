import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TitleText from "..";

jest.setTimeout(120000);

describe("Title Text", () => {
  test("Render Title Text", async () => {
    render(<TitleText title="Test Title Text" />);

    await expect(await screen.findByText(/test title text/i)).toBeVisible();
  });
});
