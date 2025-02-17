import { PlayerGame } from '../types/player';

const playerGamesStoreName = 'playerGames';

export const getPlayerGamesFromCache = (): PlayerGame[] => {
  let playerGames: PlayerGame[] = [];

  const store = sessionStorage.getItem(playerGamesStoreName);
  if (store) {
    playerGames = JSON.parse(store);
  }
  return playerGames;
};

export const isGameInPlayerCache = (gameId: string): boolean => {
  const playerGames = getPlayerGamesFromCache();
  console.log(`TRACE playerGames ${JSON.stringify(playerGames)}`);
  const found = playerGames.find(
    (playerGames) => playerGames.gameId === gameId
  );
  if (found) {
    return true;
  }
  return found ? true : false;
};

export const updatePlayerGamesInCache = (playerGames: PlayerGame[]) => {
  sessionStorage.setItem(playerGamesStoreName, JSON.stringify(playerGames));
};
