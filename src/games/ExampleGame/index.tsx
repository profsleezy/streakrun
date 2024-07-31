import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React from 'react'
import SOUND from './test.mp3'
import { Canvas } from '@react-three/fiber'
import { useGamba } from 'gamba-react-v2'

export default function ExampleGame() {
  const _data = React.useRef(Array(100).fill(50)) // Start with a default value
  const _previousValue = React.useRef(50) // Track the last value
  const _lastUpdateTime = React.useRef(0) // Track the last update time
  const [wager, setWager] = useWagerInput()
  const game = GambaUi.useGame()
  const sound = useSound({ test: SOUND })

  const click = () => {
    sound.play('test', { playbackRate: .75 + Math.random() * .5 })
  }

  const play = async () => {
    await game.play({
      wager,
      bet: [2, 0],
    })
    const result = await game.result()
    console.log(result)
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            const { width, height } = size
            const data = _data.current
            const previousValue = _previousValue.current
            const lastUpdateTime = _lastUpdateTime.current
            const step = width / (data.length - 1)
            const maxRange = height / 5 // Increased range for noticeable fluctuations
            const updateInterval = 5000 // Update every 5 seconds

            // Slow down the movement by updating less frequently
            if (clock.time - lastUpdateTime >= updateInterval) {
              const randomChange = (Math.random() - 0.5) * 0.2 // Smaller random change
              const newValue = Math.max(0, Math.min(height, previousValue + randomChange * maxRange))

              // Update the data with new smoothed values
              data.shift()
              data.push(newValue)
              _previousValue.current = newValue
              _lastUpdateTime.current = clock.time
            }

            // Clear the canvas
            ctx.clearRect(0, 0, width, height)

            // Draw the line with limited horizontal range
            ctx.strokeStyle = 'hsla(200, 100%, 50%, 1)'
            ctx.lineWidth = 2
            ctx.beginPath()

            // Start drawing from the beginning of the line
            ctx.moveTo(0, height - data[0])

            // Draw up to 3/4 of the canvas width
            for (let i = 1; i < data.length; i++) {
              const xPos = Math.min(i * step, width * 0.75) // Limit x position to 3/4 of the width
              ctx.lineTo(xPos, height - data[i])
            }

            ctx.stroke()

            ctx.restore()
          }}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={click}>
          Useless button
        </GambaUi.Button>
        <GambaUi.PlayButton onClick={play}>
          Double Or nothing
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  )
}
