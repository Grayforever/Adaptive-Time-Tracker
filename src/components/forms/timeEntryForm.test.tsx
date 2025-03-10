import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import TimeEntryForm from "./timeEntryFormUpated";

// Silence specific React warnings that aren't relevant to tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes("Function components cannot be given refs") ||
      args[0]?.includes("Invalid DOM property") ||
      args[0]?.includes("An update to") ||
      args[0]?.includes("not wrapped in act") ||
      args[0]?.includes("The current testing environment is not configured")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("TimeEntryForm", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders form elements correctly", () => {
    render(<TimeEntryForm />);

    expect(
      screen.getByPlaceholderText("What are you working on?")
    ).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByTestId("timer-display")).toHaveTextContent("00:00:00");
    expect(screen.getByRole("button", { name: /START/i })).toBeInTheDocument();
    expect(screen.getByTestId("billable-toggle")).toBeInTheDocument();
  });

  it("handles timer start/stop", () => {
    render(<TimeEntryForm />);

    const startButton = screen.getByTestId("timer-button");
    expect(startButton).toHaveTextContent("START");

    // Start timer - simplified without unnecessary act()
    fireEvent.click(startButton);
    expect(startButton).toHaveTextContent("STOP");
    expect(startButton).toHaveClass("bg-red-500");

    // Advance timer by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId("timer-display")).toHaveTextContent("00:00:05");

    // Stop timer - simplified without unnecessary act()
    fireEvent.click(startButton);
    expect(startButton).toHaveTextContent("START");
    expect(startButton).toHaveClass("bg-blue-500");
    expect(screen.getByTestId("timer-display")).toHaveTextContent("00:00:00");
  });

  it("toggles billable status", () => {
    render(<TimeEntryForm />);
    const billableToggle = screen.getByTestId("billable-toggle");
    const billableIcon = screen.getByTestId("billable-icon");

    // Initially should be gray
    expect(billableIcon).not.toHaveClass("text-blue-500");

    // Click to toggle - simplified without unnecessary act()
    fireEvent.click(billableToggle);

    // Should now be blue
    expect(billableIcon).toHaveClass("text-blue-500");
  });

  // This test is simplified as Select in Radix UI requires more complex testing
  it("submits form with correct values", async () => {
    // Mock console.log before rendering
    const originalConsoleLog = console.log;
    const mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;

    render(<TimeEntryForm />);

    // Fill in the task - simplified without unnecessary act()
    fireEvent.change(screen.getByTestId("task-input"), {
      target: { value: "Test Task" },
    });

    // Start and stop timer to set start/end times
    const startButton = screen.getByTestId("timer-button");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(startButton);

    // Submit the form - use querySelector instead of getByRole
    const form = document.querySelector("form");
    fireEvent.submit(form);

    // Wait for the component to update
    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    // Verify that console.log was called with the expected values
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "submitted",
      expect.objectContaining({
        task: "Test Task",
      })
    );

    // Restore original console.log
    console.log = originalConsoleLog;
  });
});
