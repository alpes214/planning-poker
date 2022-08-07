import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import { theme } from './service/theme';

import "firebase/compat/auth";
import { deletePlayerFromGame } from './service/players';

function App() {

  const [playerName, setPlayerName] = useState('');
  const [joinGameId, setJoinGameId] = useState('');
  

  useEffect(() => {
    const handleOnDelete = async (player: string) => {
      if (joinGameId) {
        console.log(player);
        await deletePlayerFromGame(joinGameId, player);
      }
    };

    const handleTabClose = (event: { preventDefault: () => void; returnValue: string; }) => {
      event.preventDefault();
      handleOnDelete(playerName);

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [playerName, joinGameId]);
  
  return (
    <div className="LightTheme">
    <ThemeProvider theme={theme} >
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Toolbar />
          <Switch>
            <Route path='/game/:id' component={GamePage} />
            <Route path='/join/:id'  render={
              (props) => <HomePage { ... props} 
              playerName={playerName} 
              setPlayerName={setPlayerName}
              joinGameId={joinGameId}
              setJoinGameId={setJoinGameId}
              />
              } />
            <Route exact path='/*' component={HomePage} />

          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
