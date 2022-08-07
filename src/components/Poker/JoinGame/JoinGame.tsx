import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  TextField,
} from '@material-ui/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPlayersFromStore } from '../../../repository/firebase';
import {
  addPlayerToGame,
} from '../../../service/players';
import './JoinGame.css';


export const JoinGame = (props: any) => {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();

  const [gameFound, setIsGameFound] = useState(true);
  const [playerFound, setIsPlayerFound] = useState(false);

  let playerName = props['playerName'];
  let setPlayerName = props['setPlayerName'];

  let joinGameId = props['joinGameId'];
  let setJoinGameId = props['setJoinGameId'];

  if (typeof setJoinGameId === 'function') {
    setJoinGameId(id);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (joinGameId) {
      const players = await getPlayersFromStore(joinGameId);

      let playerFound = false;
      players.forEach((player) => {
        if (player.name === playerName) {
          console.log('Player exists');
          setIsPlayerFound(true);
          playerFound = true;
        }
      });
      const res = await addPlayerToGame(joinGameId, playerName);

      setIsGameFound(res);
      if (res && !playerFound) {
        history.push(`/game/${joinGameId}`);
      }
    }
  };

  return (
    <Grow in={true} timeout={500}>
      <div>
        <form onSubmit={handleSubmit}>
          <Card variant='outlined' className='JoinGameCard'>
            <CardHeader
              className='JoinGameCardHeader'
              title='Join a Session'
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent className='JoinGameCardContent'>
              <TextField
                error={!gameFound}
                helperText={!gameFound && 'Session not found, check the ID'}
                className='JoinGameTextField'
                required
                id='filled-required'
                label='Session ID'
                placeholder='xyz...'
                defaultValue={id}
                variant='outlined'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (typeof setJoinGameId === 'function') {
                    setJoinGameId(id);
                  }
                }
                }
              />
              <TextField
                error={playerFound}
                helperText={playerFound && 'Player with this name already joined game.'}
                className='JoinGameTextField'
                required
                id='filled-required'
                label='Your Name'
                placeholder='Enter your name'
                defaultValue={playerName}
                variant='outlined'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (typeof setPlayerName === 'function') {
                    setPlayerName(event.target.value)
                  }
                }
              }
              />
            </CardContent>
            <CardActions className='JoinGameCardAction'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='JoinGameButton'
              >
                Join
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </Grow>
  );
};
