import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Home from "../pages/Home";

// Mock localStorage
vi.stubGlobal("localStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
});

describe("Home UI Tests", () => {
  it("renders the home page with correct content", () => {
    localStorage.getItem.mockReturnValue("light");

    render(<Home />);

    expect(screen.getByText("Welcome to wYZen")).toBeInTheDocument();
    expect(
      screen.getByText("Collaborative Knowledge Management System")
    ).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });


  

  it("contains a Learn More button linking to GitHub", () => {
    render(<Home />);

    const learnMoreButton = screen.getByText("Learn More").closest("a");
    expect(learnMoreButton).toHaveAttribute(
      "href",
      "https://github.com/HollowWeb/Modul223-Backend"
    );
    expect(learnMoreButton).toHaveAttribute("target", "blank");
  });
});
