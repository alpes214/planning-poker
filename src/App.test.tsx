import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./service/players');
jest.mock('./service/games');

import firebase from "firebase/compat/app";
// import "firebase/compat/auth";


jest.mock('firebase', () => {
  const auth = jest.fn();
  const mAuth = { signInWithPopup: jest.fn() };
  // @ts-ignore
  auth.GoogleAuthProvider = jest.fn();
  // @ts-ignore
  auth.Auth = jest.fn(() => mAuth);
  return { auth };
});


describe('App', () =>
  it('Should display toolbar with header', () => {
    render(<App />);
    const toolBarHeader = screen.getByText('Planning Poker');
    expect(toolBarHeader).toBeInTheDocument();
  }));
