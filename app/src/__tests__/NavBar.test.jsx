import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";

// Mock react-router navigate function
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe("Navbar UI Tests", () => {
  it("renders navbar with links", () => {
    render(
      <MemoryRouter>
        <Navbar darkMode={false} toggleDarkMode={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Articles")).toBeInTheDocument();
    expect(screen.getByText("Admin ▼")).toBeInTheDocument();
  });

  it("toggles admin dropdown", () => {
    render(
      <MemoryRouter>
        <Navbar darkMode={false} toggleDarkMode={() => {}} />
      </MemoryRouter>
    );

    // Click Admin dropdown button
    const adminButton = screen.getByText("Admin ▼");
    fireEvent.click(adminButton);

    // Check if dropdown options appear
    expect(screen.getByText("Tags/Categories")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Pending Articles")).toBeInTheDocument();

    // Click outside to close
    fireEvent.mouseLeave(adminButton);
    expect(screen.queryByText("Tags/Categories")).not.toBeInTheDocument();
  });

  it("shows Login/Register when logged out", () => {
    render(
      <MemoryRouter>
        <Navbar darkMode={false} toggleDarkMode={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("shows Profile/Logout when logged in", () => {
    localStorage.setItem("jwtToken", "mockToken");

    render(
      <MemoryRouter>
        <Navbar darkMode={false} toggleDarkMode={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // Cleanup
    localStorage.removeItem("jwtToken");
  });

});
