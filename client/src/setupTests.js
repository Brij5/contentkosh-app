import '@testing-library/jest-dom';
import 'jest-styled-components';
import { createSerializer } from 'jest-styled-components';
import { StyleSheetTestUtils } from 'styled-components';

// Set up styled-components serializer
expect.addSnapshotSerializer(createSerializer());

// Prevent styled-components from injecting styles during tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;
