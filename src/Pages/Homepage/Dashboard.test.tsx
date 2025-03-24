import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { getAllProjects } from "../../API/Projects/ProjectAPis";
import { act } from "react";

// Mock the API call
jest.mock("@/API/Projects/ProjectAPis", () => ({
  getAllProjects: jest.fn(),
}));

// Mock child components
jest.mock("@/components/ui/Layout/DoughnutChart", () => () => <div data-testid="doughnut-chart"></div>);
jest.mock("@/components/ui/Layout/LineChart", () => () => <div data-testid="line-chart"></div>);

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dashboard", () => {
    render(<Dashboard />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it("fetches and displays projects", async () => {
    const mockProjects = [
      { id: 1, name: "Project 1", status: "Active", duration: "3 months", created_at: "2024-03-10", color: "blue" },
      { id: 2, name: "Project 2", status: "Completed", duration: "6 months", created_at: "2024-03-11", color: "red" },
    ];

    (getAllProjects as jest.Mock).mockResolvedValue({ data: mockProjects });

    await act(async () => {
      render(<Dashboard />);
    });

    // Wait for data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText("Project 1")).toBeInTheDocument();
      expect(screen.getByText("Project 2")).toBeInTheDocument();
    });
  });

  it("updates chart data when project list changes", async () => {
    const mockProjects = [
      { id: 1, name: "Project 1", status: "Active", duration: "3 months", created_at: "2024-03-10", color: "blue" },
      { id: 2, name: "Project 2", status: "Completed", duration: "6 months", created_at: "2024-03-11", color: "red" },
      { id: 3, name: "Project 3", status: "Active", duration: "2 months", created_at: "2024-03-10", color: "blue" },
    ];

    (getAllProjects as jest.Mock).mockResolvedValue({ data: mockProjects });

    await act(async () => {
      render(<Dashboard />);
    });

    // Wait for the chart data to update
    await waitFor(() => {
      expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
      expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });
  });

  it("displays projects in the list", async () => {
    const mockProjects = [
      { id: 1, name: "Project 1", status: "Active", duration: "3 months", created_at: "2024-03-10", color: "blue" },
    ];

    (getAllProjects as jest.Mock).mockResolvedValue({ data: mockProjects });

    await act(async () => {
      render(<Dashboard />);
    });

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
  });
});
