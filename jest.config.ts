import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

export default config;
