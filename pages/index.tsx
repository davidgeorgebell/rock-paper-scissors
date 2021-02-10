import Head from 'next/head';
import { useState, useEffect } from 'react';

const options = [
  {
    id: 1,
    name: 'rock',
    losesTo: 'paper',
  },
  {
    id: 2,
    name: 'paper',
    losesTo: 'scissors',
  },
  {
    id: 3,
    name: 'scissors',
    losesTo: 'rock',
  },
];

export default function Home() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [playerSelect, setPlayerSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);

  useEffect(() => {
    if (
      (playerSelect?.name === 'rock' && computerSelect.name === 'scissors') ||
      (playerSelect?.name === 'paper' && computerSelect.name === 'rock') ||
      (playerSelect?.name === 'scissors' && computerSelect.name === 'paper')
    ) {
      setWins(wins => wins + 1);
    } else if (
      playerSelect !== null &&
      playerSelect?.losesTo === computerSelect?.name
    ) {
      setLosses(losses => losses + 1);
    }
  }, [playerSelect, computerSelect]);

  const handleSelection = choice => {
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    setComputerSelect(randomChoice);
    const optionClicked = options.find(o => o.id === choice);
    setPlayerSelect(optionClicked);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='app'>
        <main>
          <h1>Rock - Paper - Scissors</h1>
          <div className='scoreboard'>
            <h3 className='scoreboard-result'>Wins {wins}</h3>
            <h3 className='scoreboard-result'>Losses {losses}</h3>
          </div>
          <div className='game-display'>
            <h2>Choose your hand</h2>
            <p>player selected: {playerSelect ? playerSelect.name : null}</p>
            <p>
              computer selected: {computerSelect ? computerSelect.name : null}
            </p>
          </div>
          <div className='buttons'>
            {options.map(option => (
              <button
                onClick={() => handleSelection(option.id)}
                key={option.id}>
                {option.name}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
