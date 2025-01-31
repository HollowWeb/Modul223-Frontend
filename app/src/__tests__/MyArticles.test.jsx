import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom"; // ✅ Fix for `toBeInTheDocument`
import MyArticles from "../pages/MyArticles";

// Mock react-router's navigate function
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()), // Mock navigate function
  };
});

describe("MyArticles UI Tests", () => {
  it("renders My Articles page with correct heading", () => {
    render(
      <MemoryRouter>
        <MyArticles />
      </MemoryRouter>
    );

    expect(screen.getByText("My Articles")).toBeInTheDocument();
    expect(screen.getByText("Select an existing article or create a new one.")).toBeInTheDocument();
  });

  it("shows 'Create New Article' button and opens modal on click", () => {
    render(
      <MemoryRouter>
        <MyArticles />
      </MemoryRouter>
    );

    const createButton = screen.getByText("+ Create New Article");
    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);

    // Check if modal appears (Assuming modal has heading 'Create New Article')
    expect(screen.getByText("Create New Article")).toBeInTheDocument();
  });

  it("shows no articles message if list is empty", () => {
    render(
      <MemoryRouter>
        <MyArticles />
      </MemoryRouter>
    );

    expect(
      screen.getByText('No articles found. Click "Create New Article" to get started!')
    ).toBeInTheDocument();
  });

});
