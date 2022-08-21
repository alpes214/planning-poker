import { render, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from './Footer';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Footer component', () => {
  const { location } = window;
  beforeAll(() => {
    if (window.location) {
      // @ts-ignore
      delete window.location;
    }
    // @ts-ignore
    window.location = { href: '' };
  });

  it('should have at least one test', () => {
    expect(true);
  });

  afterAll((): void => {
    window.location = location;
  });
});
