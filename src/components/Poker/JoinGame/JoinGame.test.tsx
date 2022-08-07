import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import reactRouter from 'react-router';
import * as gameService from '../../../service/games';
import * as playersService from '../../../service/players';
import { Game } from '../../../types/game';
import { JoinGame } from './JoinGame';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebase_api from '../../../repository/firebase'

jest.mock('../../../service/players');
jest.mock('../../../service/games');
const mockHistoryPush = jest.fn();

describe('JoinGame component', () => {
  beforeEach(() => {
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({ push: mockHistoryPush } as any);
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '' });
  });
  it('should display correct text fields', () => {
    render(<JoinGame />);

    expect(screen.getByPlaceholderText('xyz...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should display join button', () => {
    render(<JoinGame />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join');
  });
  it.only('should be able to join a session', async () => {
    jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    jest.spyOn(firebase_api, "getPlayersFromStore").mockResolvedValue([])

    render(<JoinGame playerName='Rock' joinGameId='gameId' />);
    const sessionID = screen.getByPlaceholderText('xyz...');
    userEvent.clear(sessionID);
    userEvent.type(sessionID, 'gameId');

    const userName = screen.getByPlaceholderText('Enter your name');
    userEvent.type(userName, 'Rock');

    const joinButton = screen.getByText('Join');


    act(() => {
      userEvent.click(joinButton);
    });

    await waitFor(() => expect(playersService.addPlayerToGame).toHaveBeenCalled());
    await waitFor(() => expect(playersService.addPlayerToGame).toHaveBeenCalledWith('gameId', 'Rock'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/gameId'));
  });

  it('should automatically join the game when player has already joined', async () => {
    const gameId = 'abc';
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: gameId });
    jest.spyOn(gameService, 'getGame').mockResolvedValue({ id: gameId } as Game);
    jest.spyOn(playersService, 'addPlayerToGame').mockResolvedValue(true);
    jest.spyOn(playersService, 'isCurrentPlayerInGame').mockReturnValue(true);

    act(() => {
      render(<JoinGame />);
    });

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game/abc'));
  });
});
