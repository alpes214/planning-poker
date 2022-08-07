import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./service/players');
jest.mock('./service/games');

import firebase from "firebase/compat/app";


describe('App', () =>
  it('Should display toolbar with header', () => {
    render(<App />);
    const toolBarHeader = screen.getByText('Planning Poker');
    expect(toolBarHeader).toBeInTheDocument();
  }));
