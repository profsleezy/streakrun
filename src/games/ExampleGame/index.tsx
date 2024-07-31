import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2';
import React from 'react';
import SOUND from './test.mp3';

export default function HigherOrLowerGame() {
  const [wager, setWager] = useWagerInput();
  const [currentNumber, setCurrentNumber] = React.useState(generateRandomNumber());
  const [nextNumber, setNextNumber] = React.useState(generateRandomNumber());
  const [guess, setGuess] = React.useState(null); // 'higher' or 'lower'
  const [resultMessage, setResultMessage] = React.useState('');
  const sound = useSound({ test: SOUND });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = async (guess) => {
    const newNextNumber = generateRandomNumber();
    const isCorrect = (guess === 'higher' && newNextNumber > currentNumber) ||
                      (guess === 'lower' && newNextNumber < currentNumber);

    setNextNumber(newNextNumber);
    setCurrentNumber(newNextNumber);
    setGuess(guess);
    setResultMessage(isCorrect ? 'Correct!' : 'Wrong!');

    // Play sound on guess
    sound.play('test', { playbackRate: 0.75 + Math.random() * 0.5 });
  };

  const play = async () => {
    await game.play({
      wager,
      bet: [2, 0],
    });
    const result = await game.result();
    console.log(result);
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <h1>Current Number: {currentNumber}</h1>
          <h2>Next Number: {nextNumber}</h2>
          <h3>{resultMessage}</h3>
        </div>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={() => handleGuess('higher')}>Guess Higher</GambaUi.Button>
        <GambaUi.Button onClick={() => handleGuess('lower')}>Guess Lower</GambaUi.Button>
        <GambaUi.PlayButton onClick={play}>Play</GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  );
}
