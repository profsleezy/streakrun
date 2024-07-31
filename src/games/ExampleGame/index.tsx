import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React from 'react'
import SOUND from './test.mp3'

export default function HigherOrLowerGame() {
  const _hue = React.useRef(0)
  const [wager, setWager] = useWagerInput()
  const [currentValue, setCurrentValue] = React.useState(Math.floor(Math.random() * 100))
  const [nextValue, setNextValue] = React.useState(Math.floor(Math.random() * 100))
  const [userGuess, setUserGuess] = React.useState(null) // null, 'higher', 'lower'
  const game = GambaUi.useGame()
  const sound = useSound({ test: SOUND })

  const click = () => {
    _hue.current = (_hue.current + 30) % 360
    sound.play('test', { playbackRate: .75 + Math.random() * .5 })
  }

  const play = async () => {
    if (userGuess === null) return // Do nothing if no guess is made

    const result = nextValue > currentValue ? 'higher' : 'lower'
    const win = (userGuess === result)
    
    // Implement game logic here to handle wager and result
    console.log(`Current Value: ${currentValue}, Next Value: ${nextValue}, Guess: ${userGuess}, Result: ${win ? 'Win' : 'Lose'}`)
    
    try {
      await game.play({
        wager,
        bet: [2, 0],
      })
    } catch (error) {
      console.error("Game play error:", error)
    }

    // Update the values
    setCurrentValue(nextValue)
    setNextValue(Math.floor(Math.random() * 100))
    setUserGuess(null) // Reset user guess
  }

  const handleGuess = (guess) => {
    setUserGuess(guess)
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            const scale = 3 + Math.cos(clock.time) * .5
            const hue = _hue.current

            ctx.fillStyle = 'hsla(' + hue + ', 50%, 3%, 1)'
            ctx.fillRect(0, 0, size.width, size.height)

            ctx.save()
            ctx.translate(size.width / 2, size.height / 2)

            // Example trading visuals
            ctx.fillStyle = 'hsla(' + hue + ', 75%, 60%, .2)'
            ctx.fillRect(-size.width / 2, -size.height / 2, size.width, size.height)

            // Draw current and next values as visual indicators
            ctx.fillStyle = 'hsla(' + hue + ', 75%, 60%, 1)'
            ctx.font = '32px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`Current: ${currentValue}`, 0, -50)
            ctx.fillText(`Next: ${nextValue}`, 0, 50)

            ctx.restore()
          }}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={click}>
          Useless button
        </GambaUi.Button>
        <GambaUi.Button onClick={() => handleGuess('lower')}>
          Guess Lower
        </GambaUi.Button>
        <GambaUi.Button onClick={() => handleGuess('higher')}>
          Guess Higher
        </GambaUi.Button>
        <GambaUi.PlayButton onClick={play}>
          Submit Guess
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  )
}
