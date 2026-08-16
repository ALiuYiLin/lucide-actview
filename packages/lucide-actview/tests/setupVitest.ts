import '@testing-library/jest-dom/vitest';
import { cleanup } from '@actview/testing';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
