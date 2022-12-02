import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import InputField from "..";

jest.setTimeout(120000);

describe("Input Field", () => {
  test("Render Input Field", async () => {
    render(<InputField data-testid="input-field" />);

    const value = "Test Value";

    await userEvent.type(await screen.findByTestId("input-field"), value);

    await expect(screen.getByDisplayValue("Test Value")).toBeInTheDocument();
  });
});
