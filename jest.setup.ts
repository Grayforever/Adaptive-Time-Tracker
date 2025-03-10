import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom";
jest.setTimeout(10000);
// Configure Testing Library
configure({
  // This enables better act() warning detection
  asyncUtilTimeout: 1000,
  // Recommended for react-hook-form
  defaultHidden: true,
});

// Set up global mocks required for React 18
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Fix for act() warnings
global.IS_REACT_ACT_ENVIRONMENT = true;
