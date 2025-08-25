module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom/dist/index.js'],
  moduleNameMapper: {
    // Mock CSS imports (Vite style imports)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mock static assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
