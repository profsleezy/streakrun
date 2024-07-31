import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React from 'react'
import SOUND from './test.mp3'
import { Canvas } from '@react-three/fiber'
import { useGamba } from 'gamba-react-v2'

export default function ExampleGame() {
  const _data = React.useRef(Array(100).fill(0))
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
            const step = width / (data.length - 1)

            // Update the data with new random values
            const newValue = Math.random() * height // Random new value
            data.shift()
            data.push(newValue)

            // Clear the canvas
            ctx.clearRect(0, 0, width, height)

            // Draw the line
            ctx.strokeStyle = 'hsla(200, 100%, 50%, 1)'
            ctx.lineWidth = 2
            ctx.beginPath()

            ctx.moveTo(0, height - data[0])

            for (let i = 1; i < data.length; i++) {
              ctx.lineTo(i * step, height - data[i])
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
