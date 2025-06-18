import "@testing-library/jest-dom";

global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    // mock implementation
  }
  unobserve() {
    // mock implementation
  }
  disconnect() {
    // mock implementation
  }
};