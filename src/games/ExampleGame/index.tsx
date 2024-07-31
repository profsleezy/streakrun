import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React, { useState, useEffect } from 'react'
import SOUND from './test.mp3'

export default function TradingSimulator() {
  const [wager, setWager] = useWagerInput()
  const [currentValue, setCurrentValue] = useState(Math.random())
  const [nextValue, setNextValue] = useState(Math.random())
  const [guess, setGuess] = useState(null) // 'up' or 'down'
  const [result, setResult] = useState(null) // 'win' or 'lose'
  const [balance, setBalance] = useState(1000) // Starting balance
  const sound = useSound({ test: SOUND })

  // Simulate value changes
  useEffect(() => {
    const interval = setInterval(() => {
      setNextValue(currentValue + (Math.random() - 0.5) * 0.1)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentValue])

  const handleGuess = (direction) => {
    setGuess(direction)
    const isCorrect = (direction === 'up' && nextValue > currentValue) ||
                      (direction === 'down' && nextValue < currentValue)
    
    // Update balance based on guess correctness
    if (isCorrect) {
      setBalance(prevBalance => prevBalance + wager)
      setResult('win')
    } else {
      setBalance(prevBalance => prevBalance - wager)
      setResult('lose')
    }
    
    // Update current value
    setCurrentValue(nextValue)
    sound.play('test', { playbackRate: .75 + Math.random() * .5 })
  }

  const handlePlay = async () => {
    // Log the result of the play action
    console.log(`Wager: ${wager}, Guess: ${guess}, Result: ${result}, Balance: ${balance}`)
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }) => {
            // Example visual update for current value and next value
            const hue = (currentValue + 0.5) * 360 // Just for demo

            ctx.fillStyle = 'hsla(' + hue + ', 50%, 50%, 1)'
            ctx.fillRect(0, 0, size.width, size.height)

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = '32px Arial'
            ctx.fillStyle = 'white'
            ctx.fillText(`Current Value: ${currentValue.toFixed(2)}`, size.width / 2, size.height / 2 - 20)
            ctx.fillText(`Next Value: ${nextValue.toFixed(2)}`, size.width / 2, size.height / 2 + 20)

            if (result) {
              ctx.fillStyle = result === 'win' ? 'green' : 'red'
              ctx.fillText(`You ${result}!`, size.width / 2, size.height / 2 + 60)
            }
          }}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={() => handleGuess('up')}>
          Guess Up
        </GambaUi.Button>
        <GambaUi.Button onClick={() => handleGuess('down')}>
          Guess Down
        </GambaUi.Button>
        <GambaUi.PlayButton onClick={handlePlay}>
          Play
        </GambaUi.PlayButton>
        <div>Balance: ${balance}</div>
      </GambaUi.Portal>
    </>
  )
}
